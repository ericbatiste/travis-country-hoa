import { NextRequest, NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export async function POST(req: NextRequest) {
  const {
    firstName,
    lastName,
    email,
    message,
    monthlyNewsletter,
    questionnaires,
  } = await req.json();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY as string,
  });

  const domain = process.env.MAILGUN_DOMAIN as string;

  const data = {
    from: `Our Travis Country <no-reply@${domain}>`,
    to: `info@${domain}`,
    subject: 'Contact Form Submission',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New message from Our Travis Country:</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a73e8;">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${message}</p>
        <hr style="border: 0; border-top: 1px solid #ccc;" />
        <h3>Additional Information:</h3>
        <ul>
          <li><strong>Signed up for Monthly Close Up:</strong> ${monthlyNewsletter ? 'YES' : 'NO'}</li>
          <li><strong>Signed up for Questionnaires:</strong> ${questionnaires ? 'YES' : 'NO'}</li>
        </ul>
      </div>
    `,
  };

  try {
    await mg.messages.create(domain, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}


