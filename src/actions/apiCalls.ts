import { getErrorMessage } from '@/utils/errorMsg';
import { browserClient } from '@/utils/supabase/client';
import { serverClient } from '@/utils/supabase/server';

export const postUserRegistration = async (formData: FormData) => {
  const supabase = browserClient();

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const address = formData.get('address') as string;

  const { data, error } = await supabase
    .from('users')
    .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address
    });

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
};

export const getPendingUsers = async () => {
  try {
    const supabase = browserClient();

    const { data: users, error } = await supabase
      .from('users')
      .select('id, first_name, last_name, email, address, status')
      .eq('status', 'pending');

    if (error) throw new Error();

    return users || [];
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
};

export const getAdmins = async () => {
  try {
    const supabase = browserClient();

    const { data: users, error } = await supabase
      .from('users')
      .select('email')
      .eq('admin', true);

    const admins = users?.map(user => user.email);

    if (error) throw error;

    return admins;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserStatus = async (email: string, updatedStatus: string) => {
  try {
    const supabase = browserClient();

    const { error } = await supabase
      .from('users')
      .update({ status: updatedStatus })
      .eq('email', email);

    if (error) throw error;

  } catch (error) {
    console.log(error);
  }
};

export const postNewFeaturedBylaw = async (
  sectionNumber: string,
  sectionTitle: string,
  bylawText: string,
  inANutshell: string
) => {
  try {
    const supabase = browserClient();

    const { error } = await supabase
      .from('bylaws')
      .insert({
        section_number: sectionNumber,
        section_title: sectionTitle,
        bylaw_text: bylawText,
        in_a_nutshell: inANutshell
      });

    if (error) throw error;

    return { errorMessage: null }
  } catch(error) {
    return { errorMessage: getErrorMessage(error) }
  }
};

export const getBoardObservations = async () => {
  try {
    const supabase = browserClient()

    const { data, error } =  await supabase
    .from('board_observations')
    .select('id, last_updated, content')

    if (error) throw error

    return data[0] || []
  } catch (error) {
    console.log(error)
  }
}

export const updateBoardObservations = async (content: string) => {
  try {
    const supabase = browserClient();

    const data = await getBoardObservations()

    const { error } = await supabase
      .from('board_observations')
      .update({
        last_updated: new Date(),
        content: content,
      })
      .eq('id', data?.id);

    if (error) throw error;

    return { errorMessage: null }
  } catch(error) {
    return { errorMessage: getErrorMessage(error) }
  }
};


