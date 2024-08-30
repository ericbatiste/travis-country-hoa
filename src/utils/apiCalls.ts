import { ContactType } from './types';

export const sendContactUsEmail = async (formData: ContactType) => {
  const res = await fetch('/api/send-contact-us-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to send message: ${result.error}`);
  }

  return result;
};

export const sendAdminEmail = async (list: string, subject: string, body: string) => {
  const res = await fetch('/api/send-admin-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ list, subject, body })
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to send message: ${result.error}`);
  }

  return result;
};

export const populateMailingLists = async () => {
  try {
    const res = await fetch('/api/populate-mailing-lists');

    const result = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to populate mailing lists: ${result.error}`);
    }

    console.log('Mailing lists populated successfully:', result.message);
  } catch (error) {
    console.error('Error populating mailing lists:', error);
  }
};
