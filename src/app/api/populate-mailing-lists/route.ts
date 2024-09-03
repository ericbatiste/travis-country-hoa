import { NextRequest, NextResponse } from 'next/server';
import { addUserToMailgunLists, mailgunClient } from '@/utils/mailgun';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email } = await req.json();
  const domain = process.env.MAILGUN_DOMAIN!;
  const mailingLists = [`monthly_close_up@${domain}`, `questionnaire@${domain}`];

  try {
    for (const list of mailingLists) {
      await addUserToMailgunLists(firstName, lastName, email, list);
    }

    return NextResponse.json({ message: 'Both mailing lists populated successfully' });
  } catch (error) {
    console.error('Error populating mailing lists:', error);
    return NextResponse.json({ error: 'Failed to populate mailing lists' }, { status: 500 });
  }
}

