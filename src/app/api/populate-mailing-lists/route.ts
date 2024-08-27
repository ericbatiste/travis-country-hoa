import { NextResponse } from 'next/server';
import { fetchMailingListSupa } from '@/utils/supabase/actions';
import { mailgunClient, fetchExistingEmails, addToMailingList } from '@/utils/mailgun';

export async function GET() {
  try {
    const mg = mailgunClient();
    const domain = process.env.MAILGUN_DOMAIN!;

    const monthlyCloseUpSubscribers = await fetchMailingListSupa('monthly_close_up');
    const questionnaireSubscribers = await fetchMailingListSupa('questionnaire');

    const existingMCUEmails = await fetchExistingEmails(mg, `monthly_close_up@${domain}`);
    const existingQuestEmails = await fetchExistingEmails(mg, `questionnaire@${domain}`);

    for (const { firstName, lastName, email } of monthlyCloseUpSubscribers) {
      await addToMailingList(
        firstName,
        lastName,
        email,
        `monthly_close_up@${domain}`,
        existingMCUEmails
      );
    }

    for (const { firstName, lastName, email } of questionnaireSubscribers) {
      await addToMailingList(
        firstName,
        lastName,
        email,
        `questionnaire@${domain}`,
        existingQuestEmails
      );
    }

    return NextResponse.json({ message: 'Both mailing lists populated successfully' });
  } catch (error) {
    console.error('Error populating mailing lists:', error);
    return NextResponse.json({ error: 'Failed to populate mailing lists' }, { status: 500 });
  }
}
