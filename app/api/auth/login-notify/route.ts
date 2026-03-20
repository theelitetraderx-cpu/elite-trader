import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Elite Trader <onboarding@resend.dev>', // You can update this once domain is verified
      to: [email],
      subject: 'Security Alert: New Login Detected',
      html: `
        <div style="font-family: sans-serif; background: #080808; color: #fff; padding: 40px; border-radius: 12px; border: 1px solid #d4af37;">
          <h2 style="color: #d4af37;">Hello ${firstName || 'Trader'},</h2>
          <p>This is a security notification to let you know that your <strong>Elite Trader</strong> account was just logged into.</p>
          <div style="background: #111; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #888;">Time: ${new Date().toLocaleString()}</p>
            <p style="margin: 8px 0 0 0; color: #888;">Platform: Elite Trader Web Application</p>
          </div>
          <p>If this was you, you can safely ignore this email.</p>
          <p>If you did not authorize this login, please change your password immediately in your account settings.</p>
          <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
          <p style="font-size: 12px; color: #555;">© 2025 Elite Trader. All rights reserved.</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
