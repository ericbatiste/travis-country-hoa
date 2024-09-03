import { NextRequest, NextResponse } from 'next/server';
import { mailgunClient } from '@/utils/mailgun';
import { sanitizeHTML } from '@/utils/sanitizeHtml';

export async function POST(req: NextRequest) {
  const {
    list,
    subject,
    body,
  } = await req.json();

  if (!list || !subject || !body) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const mg = mailgunClient()
  const domain = process.env.MAILGUN_DOMAIN as string;
  // const unsubscribeLink = `https://${domain}/unsubscribe?email=%recipient%`;
  const unsubscribeLink = `http://localhost:3000/unsubscribe?email=%recipient%`;
  const bodyWithUnsubscribe = `
  <p>${sanitizeHTML(body)}</p>
  <p>
    No longer want to recieve emails from Our Travis Country? 
    <a href="${unsubscribeLink}">unsubscribe here</a>.
  </p>
`;

  const data = {
    from: `Our Travis Country <no-reply@${domain}>`,
    to: `${list}@${domain}`,
    subject: subject,
    html: bodyWithUnsubscribe,
    'h:List-Unsubscribe': `<${unsubscribeLink}>`,
  };

  try {
    await mg.messages.create(domain, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
