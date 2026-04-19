import { Resend } from 'resend';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { paymentId, email, planName, amount, txHash } = await request.json();

    if (!paymentId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Update status in Supabase
    const { error: updateError } = await supabase
      .from('payments')
      .update({ status: 'Verified' })
      .eq('id', paymentId);

    if (updateError) throw updateError;

    // 3. Send Email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Elite Trader <onboarding@resend.dev>',
      to: [email],
      subject: `Confirmation: Welcome to ${planName}!`,
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #050505; color: #ffffff; padding: 40px; border-radius: 20px; max-width: 600px; margin: auto; border: 1px solid #d4af37;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4af37; font-size: 28px; margin: 0; text-transform: uppercase; letter-spacing: 4px;">Elite Trader</h1>
            <div style="height: 1px; background: linear-gradient(to right, transparent, #d4af37, transparent); margin-top: 10px;"></div>
          </div>
          
          <h2 style="font-size: 20px; margin-bottom: 20px;">Payment Verified Successfully!</h2>
          <p style="color: #94a3b8; line-height: 1.6;">Hello,</p>
          <p style="color: #94a3b8; line-height: 1.6;">Your payment for the <strong>${planName}</strong> has been verified by our team. You now have full access to the program materials and community.</p>
          
          <div style="background-color: #0a0a0a; border: 1px solid #ffffff10; padding: 25px; border-radius: 15px; margin: 30px 0;">
            <h3 style="color: #d4af37; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-top: 0;">Transaction Receipt</h3>
            <table style="width: 100%; font-size: 14px; color: #e2e8f0; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Plan:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold;">${planName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Amount Paid:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #d4af37;">$${amount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">TxHash:</td>
                <td style="padding: 8px 0; text-align: right; font-size: 10px; color: #94a3b8;">${txHash}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Status:</td>
                <td style="padding: 8px 0; text-align: right;"><span style="background-color: #22c55e20; color: #4ade80; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: bold;">VERIFIED</span></td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin-top: 40px;">
            <a href="https://theelitetrader.in/dashboard" style="background-color: #d4af37; color: #000000; padding: 15px 35px; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-block; text-transform: uppercase; letter-spacing: 1px; font-size: 13px;">Enter Dashboard</a>
          </div>
          
          <p style="text-align: center; color: #475569; font-size: 12px; margin-top: 40px;">
            © 2025 Elite Trader. Trade Smart. Trade Elite.
          </p>
        </div>
      `
    });

    if (emailError) {
       console.error('Resend Error:', emailError);
       return NextResponse.json({ 
         message: 'Status updated, but email dispatch failed', 
         error: emailError.message || JSON.stringify(emailError) 
       }, { status: 200 });
    }

    return NextResponse.json({ message: 'Success', emailId: data?.id }, { status: 200 });
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
