import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const email = formData.get('email');
    const phone = formData.get('phone');
    const amount = formData.get('amount');
    const plan = formData.get('plan');
    const network = formData.get('network');
    const attachment = formData.get('attachment');
    const aadhaar = formData.get('aadhaar');
    const pan = formData.get('pan');

    if (!email || !amount || !attachment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert attachment to buffer for Resend
    const buffer = Buffer.from(await attachment.arrayBuffer());

    // Until you verify 'theelitetrader.in' in the Resend dashboard, 
    // you must use 'onboarding@resend.dev' or a verified sender.
    const FROM_EMAIL = 'Elite Trader <onboarding@resend.dev>';
    const TO_EMAIL = 'theelitetraderx@gmail.com';

    console.log(`[Notification] Sending payment proof from ${email} to ${TO_EMAIL}...`);

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email, // Allows you to reply directly to the customer
      subject: `[PAYMENT] Notification from ${email}`,
      text: `New payment notification received from ${email}. Amount: ${amount}. Plan: ${plan}. Network: ${network}. ${aadhaar ? `Aadhaar: ${aadhaar}. PAN: ${pan}.` : ''} Please check the attached proof for verification.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d4af37; border-radius: 12px; background: #050505; color: white;">
          <h2 style="color: #d4af37; text-transform: uppercase; letter-spacing: 2px;">New Payment Received</h2>
          <p style="color: #64748b; font-size: 14px;">A customer has submitted a payment notification for verification.</p>
          <hr style="border: 0; border-top: 1px solid #ffffff10; margin: 20px 0;" />
          
          <h3 style="color: #d4af37; font-size: 12px; text-transform: uppercase; margin-bottom: 15px;">Transaction Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; width: 140px;">Customer Email:</td>
              <td style="padding: 10px 0; font-weight: bold;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;">Phone Number:</td>
              <td style="padding: 10px 0; font-weight: bold;">${phone || 'Not Provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;">Amount:</td>
              <td style="padding: 10px 0; font-weight: bold; color: #d4af37; font-size: 18px;">${amount}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;">Selected Plan:</td>
              <td style="padding: 10px 0; font-weight: bold;">${plan}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;">Network/Method:</td>
              <td style="padding: 10px 0; font-weight: bold;">${network}</td>
            </tr>
          </table>

          ${aadhaar ? `
          <h3 style="color: #d4af37; font-size: 12px; text-transform: uppercase; margin-bottom: 15px;">Identity Verification (India)</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; width: 140px;">Aadhaar Number:</td>
              <td style="padding: 10px 0; font-weight: bold; font-family: monospace; letter-spacing: 1px;">${aadhaar}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;">PAN Card:</td>
              <td style="padding: 10px 0; font-weight: bold; font-family: monospace; letter-spacing: 1px;">${pan}</td>
            </tr>
          </table>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 15px; background: #ffffff05; border-radius: 8px; font-size: 12px; color: #475569; text-align: center;">
            Verification required. Check the attached payment proof image.
          </div>
        </div>
      `,
      attachments: [
        {
          filename: attachment.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
