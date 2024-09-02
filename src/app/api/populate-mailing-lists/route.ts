import { NextResponse } from 'next/server';
import { serverClient } from '@/utils/supabase/server';
import { mailgunClient, fetchExistingEmails, addToMailingList } from '@/utils/mailgun';

export async function GET() {
  try {
    const mg = mailgunClient();
    const supabase = await serverClient()
    const domain = process.env.MAILGUN_DOMAIN!;
    
    const { data: allSubscribers, error } = await supabase
      .from('mailing_list')
      .select('first_name, last_name, email, monthly_close_up, questionnaire')
      .or('monthly_close_up.eq.true,questionnaire.eq.true');

    if (!allSubscribers) {
      throw new Error(error.message)
    } else {
      const monthlyCloseUpSubscribers = allSubscribers.filter(sub => sub.monthly_close_up);
      const questionnaireSubscribers = allSubscribers.filter(sub => sub.questionnaire);
      
      const existingMCUEmails = await fetchExistingEmails(mg, `monthly_close_up@${domain}`);
      const existingQuestEmails = await fetchExistingEmails(mg, `questionnaire@${domain}`);
      
      for (const { first_name, last_name, email } of monthlyCloseUpSubscribers) {
        await addToMailingList(
          first_name,
          last_name,
          email,
          `monthly_close_up@${domain}`,
          existingMCUEmails
        );
      }
      
      for (const { first_name, last_name, email } of questionnaireSubscribers) {
        await addToMailingList(
          first_name,
          last_name,
          email,
          `questionnaire@${domain}`,
          existingQuestEmails
        );
      }
    }

    return NextResponse.json({ message: 'Both mailing lists populated successfully' });
  } catch (error) {
    console.error('Error populating mailing lists:', error);
    return NextResponse.json({ error: 'Failed to populate mailing lists' }, { status: 500 });
  }
}
