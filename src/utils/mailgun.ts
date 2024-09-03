import { MailListMember } from 'mailgun.js';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export const mailgunClient = () => {
  const mailgun = new Mailgun(formData);
  return mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY!
  });
};

export const fetchMailgunSubscribers = async (): Promise<{
  monthlyCloseUp: MailListMember[];
  questionnaire: MailListMember[];
}> => {
  const mg = mailgunClient();
  const domain = process.env.MAILGUN_DOMAIN as string;
  const mailingLists = [`monthly_close_up@${domain}`, `questionnaire@${domain}`];

  try {
    const [monthlyCloseUp, questionnaire] = await Promise.all([
      mg.lists.members.listMembers(mailingLists[0]),
      mg.lists.members.listMembers(mailingLists[1]),
    ]);

    return {
      monthlyCloseUp: monthlyCloseUp.items,
      questionnaire: questionnaire.items,
    };
  } catch (error) {
    console.error(`Failed to fetch existing members from ${mailingLists}:`, error);
    throw error;
  }
};

export const addUserToMailgunLists = async (
  firstName: string,
  lastName: string,
  email: string,
  mailingList: string
) => {
  try {
    const mg = mailgunClient();

    await mg.lists.members.createMember(mailingList, {
      subscribed: true,
      address: email,
      name: `${firstName} ${lastName}`
    });
    console.log(`Added ${email} to ${mailingList}.`);
  } catch (error) {
    console.error(`Failed to add ${email} to ${mailingList}:`, error);
  }
};

export async function unsubUserFromMailgunLists(
  email: string,
  monthlyCloseUp: string,
  questionnaire: string
) {
  try {
    const mg = mailgunClient();
    const domain = process.env.MAILGUN_DOMAIN as string;

    const mailingLists: string[] = [];
    if (monthlyCloseUp) mailingLists.push(`monthly_close_up@${domain}`);
    if (questionnaire) mailingLists.push(`questionnaire@${domain}`);

    const unsubscribe = mailingLists.map(list => {
      return mg.lists.members.destroyMember(list, email);
    });

    await Promise.all(unsubscribe);
  } catch (error) {
    console.error('Failed to unsubscribe from Mailgun lists:', error);
    throw new Error('Failed to unsubscribe from Mailgun lists');
  }
}
