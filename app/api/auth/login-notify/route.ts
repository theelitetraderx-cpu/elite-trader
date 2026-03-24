import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend only if the API key is provided; otherwise, set to null to avoid runtime errors during build.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!resend) {
      return NextResponse.json({ error: 'Resend API key is not configured.' }, { status: 500 });
    }
    const data = await resend.emails.send({
      from: 'Elite Trader <onboarding@resend.dev>',
      to: [email],
      subject: 'Security Alert: New Login Detected',
      html: `
        <div style="font-family: 'Inter', sans-serif; background: #080808; color: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid rgba(212, 175, 55, 0.2); max-width: 600px; margin: auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px; letter-spacing: 0.2em; text-transform: uppercase;">Elite Trader</h1>
            <div style="height: 1px; width: 100px; background: linear-gradient(to right, transparent, #d4af37, transparent); margin: 15px auto;"></div>
          </div>
          
          <h2 style="color: #ffffff; font-size: 20px; font-weight: 600;">Hello ${firstName || 'Trader'},</h2>
          <p style="color: #94a3b8; line-height: 1.6;">This is a security notification to let you know that your <strong>Elite Trader</strong> account was just logged into.</p>
          
          <div style="background: rgba(255, 255, 255, 0.03); padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid rgba(255, 255, 255, 0.05);">
            <p style="margin: 0; color: #94a3b8; font-size: 14px;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;"><strong>Platform:</strong> Elite Trader Web Application</p>
          </div>
          
          <p style="color: #94a3b8; line-height: 1.6;">If this was you, you can safely ignore this email.</p>
          <p style="color: #94a3b8; line-height: 1.6;">If you did not authorize this login, please <strong>change your password</strong> immediately to secure your account.</p>
          
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
            <p style="font-size: 12px; color: #475569; margin: 0;">© 2025 Elite Trader. Precision Trading. Consistent Profits.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    // If Resend was not initialized due to missing API key, provide a clear error message.
    const errMsg = !process.env.RESEND_API_KEY
      ? 'Resend API key is not configured. Set RESEND_API_KEY in environment variables.'
      : error instanceof Error
      ? error.message
      : 'An unknown error occurred.';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
