import { ContactType } from "./types";

export const sendEmail = async (formData: ContactType) => {
  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to send message: ${result.error}`);
  }

  return result;
}

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
}