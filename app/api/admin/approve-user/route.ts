import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Verify Admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    const allowedAdmins = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"];
    
    if (!user || !allowedAdmins.includes(user.email?.toLowerCase() || "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pendingUserId } = await request.json();
    if (!pendingUserId) {
      return NextResponse.json({ error: "Missing pending user ID" }, { status: 400 });
    }

    // 2. Fetch Pending User Details
    const { data: pendingUser, error: fetchError } = await supabaseAdmin
      .from('pending_users')
      .select('*')
      .eq('id', pendingUserId)
      .single();

    if (fetchError || !pendingUser) {
      return NextResponse.json({ error: "Pending user not found" }, { status: 404 });
    }

    // 3. Generate TET ID (Atomic)
    // We increment the counter in meta table
    const { data: metaData, error: metaError } = await supabaseAdmin
      .from('meta')
      .select('value')
      .eq('key', 'user_counter')
      .single();

    if (metaError) throw metaError;

    const nextCount = metaData.value + 1;
    const userCode = `TET${String(nextCount).padStart(3, '0')}`;

    // 4. Generate Random Password
    const password = Math.random().toString(36).slice(-10) + '!A1';

    // 5. Create or Get Auth User (Admin API)
    let authUserId: string;
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
    const userInAuth = existingUser.users.find(u => u.email?.toLowerCase() === pendingUser.email.toLowerCase());

    if (userInAuth) {
      console.log("User already exists in Auth, using existing ID:", userInAuth.id);
      authUserId = userInAuth.id;
      
      // Optionally update metadata if missing
      await supabaseAdmin.auth.admin.updateUserById(authUserId, {
        user_metadata: { ...userInAuth.user_metadata, name: pendingUser.name, user_code: userCode }
      });
    } else {
      const { data: authUser, error: createAuthError } = await supabaseAdmin.auth.admin.createUser({
        email: pendingUser.email,
        password: password,
        email_confirm: true,
        user_metadata: { name: pendingUser.name, user_code: userCode }
      });

      if (createAuthError) throw createAuthError;
      authUserId = authUser.user.id;
    }

    // 6. Insert into users table (use upsert to be safe) and update meta
    const { error: insertError } = await supabaseAdmin
      .from('users')
      .upsert({
        id: authUserId,
        user_code: userCode,
        name: pendingUser.name,
        email: pendingUser.email,
        plan: pendingUser.plan_name,
        status: 'approved'
      }, { onConflict: 'id' });

    if (insertError) throw insertError;

    await supabaseAdmin
      .from('meta')
      .update({ value: nextCount })
      .eq('key', 'user_counter');

    // 7. Delete from pending_users
    await supabaseAdmin
      .from('pending_users')
      .delete()
      .eq('id', pendingUserId);

    // 8. Send Approval Email via Resend
    const FROM_EMAIL = 'Elite Trader <notifications@theelitetrader.in>';
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [pendingUser.email],
      subject: 'Your Account is Approved - Welcome to Elite Trader',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #d4af37; border-radius: 16px; background: #050505; color: white;">
          <h1 style="color: #d4af37; text-transform: uppercase; letter-spacing: 2px;">Account Approved</h1>
          <p>Hello ${pendingUser.name},</p>
          <p>Your account has been successfully approved. You now have full access to the Elite Trader portal.</p>
          
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase;">Login Credentials</p>
            <p style="margin: 10px 0;"><strong>User ID:</strong> <span style="color: #d4af37;">${userCode}</span></p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${pendingUser.email}</p>
            <p style="margin: 10px 0;"><strong>Password:</strong> <code style="background: #ffffff10; padding: 2px 6px; border-radius: 4px;">${password}</code></p>
          </div>

          <a href="https://theelitetrader.in/login" style="display: inline-block; padding: 14px 28px; background: #d4af37; color: black; text-decoration: none; border-radius: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Login to Portal</a>
          
          <p style="margin-top: 30px; color: #64748b; font-size: 12px;">If you have any questions, please contact support.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, userCode });

  } catch (err: any) {
    console.error("Approval error:", err);
    return NextResponse.json({ error: err.message || "Approval failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
    try {
        const cookieStore = await cookies();
        const supabase = createClient(cookieStore);

        // Verify Admin
        const { data: { user } } = await supabase.auth.getUser();
        const allowedAdmins = ["theelitetraderx@gmail.com", "theelitetradex@gmail.com"];
        
        if (!user || !allowedAdmins.includes(user.email?.toLowerCase() || "")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { pendingUserId } = await request.json();
        
        if (!pendingUserId) {
            return NextResponse.json({ error: "Missing pending user ID" }, { status: 400 });
        }

        console.log("Rejecting user ID:", pendingUserId);

        const { error: deleteError } = await supabaseAdmin
            .from('pending_users')
            .delete()
            .eq('id', pendingUserId);

        if (deleteError) {
            console.error("Delete error:", deleteError);
            return NextResponse.json({ error: deleteError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Rejection API Crash:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
