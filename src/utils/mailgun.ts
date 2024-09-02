import formData from 'form-data';
import Mailgun from 'mailgun.js';

export const mailgunClient = () => {
  const mailgun = new Mailgun(formData);
  return mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY!
  });
};

export const fetchExistingEmails = async (
  mg: ReturnType<typeof mailgunClient>,
  mailingList: string
): Promise<Set<string>> => {
  const existingEmails = new Set<string>();

  try {
    const response = await mg.lists.members.listMembers(mailingList);
    const members = response.items;

    for (const member of members) {
      existingEmails.add(member.address);
    }
  } catch (error) {
    console.error(`Failed to fetch existing members from ${mailingList}:`, error);
  }

  return existingEmails;
}

export const addToMailingList = async (
  firstName: string,
  lastName: string,
  email: string,
  mailingList: string,
  existingEmails: Set<string>
) => {
  if (existingEmails.has(email)) return;
  const mg = mailgunClient();

  try {
    await mg.lists.members.createMember(mailingList, {
      subscribed: true,
      address: email,
      name: `${firstName} ${lastName}`
    });

    console.log(`Added ${email} to ${mailingList}.`);
  } catch (error) {
    console.error(`Failed to add ${email} to ${mailingList}:`, error);
  }
}

export async function unsubscribeFromMailgunLists(
  email: string,
  monthlyCloseUp: string,
  questionnaire: string
) {
  try {
    const mg = mailgunClient();
    const domain = process.env.MAILGUN_DOMAIN as string;
    const listsToUnsubscribe: string[] = [];

    if (monthlyCloseUp) listsToUnsubscribe.push(`monthly_close_up@${domain}`);
    if (questionnaire) listsToUnsubscribe.push(`questionnaire@${domain}`);

    const unsubscribe = listsToUnsubscribe.map(list => {
      return mg.lists.members.destroyMember(list, email);
    });

    await Promise.all(unsubscribe);
  } catch (error) {
    console.error('Failed to unsubscribe from Mailgun lists:', error);
    throw new Error('Failed to unsubscribe from Mailgun lists');
  }
}