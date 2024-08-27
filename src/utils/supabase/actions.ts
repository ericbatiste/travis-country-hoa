import { sanitizeHTML } from '../sanitizeHtml';
import { getErrorMessage } from '../errorMsg';
import { browserClient } from './client';
import { serverClient } from './server';
import {
  ContactType,
  PostNewFeaturedBylawType,
  FeaturedBylawContentType,
  BoardObservationsContentType,
  ReturnsErrorMsg,
  BylawParamsType
} from '../types';

export const addUserToMailTable = async (formData: ContactType) => {
  const { firstName, lastName, email, monthlyCloseUp, questionnaire } = formData;
  if (!monthlyCloseUp && !questionnaire) return;
  try {
    const supabase = browserClient();

    const { error } = await supabase
      .from('mailing_list')
      .insert({
          first_name: firstName,
          last_name: lastName,
          email: email,
          monthly_close_up: monthlyCloseUp,
          questionnaire: questionnaire
      });

    if (error) throw error

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const fetchMailingListSupa = async (listType: string) => {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('mailing_list')
    .select('first_name, last_name, email')
    .eq(listType, true);

  if (error) {
    console.error(`Error fetching emails for ${listType}:`, error);
    return [];
  }

  return data.map((subscriber: { first_name: string; last_name: string; email: string }) => ({
    firstName: subscriber.first_name,
    lastName: subscriber.last_name,
    email: subscriber.email
  }));
};

export const getFeaturedBylawContent = async (): Promise<FeaturedBylawContentType | null> => {
  try {
    const supabase = await serverClient();

    const { data, error } = await supabase
      .from('bylaws')
      .select('bylaw_text, in_a_nutshell')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    return data ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchBylawsClient = async () => {
  try {
    const supabase = browserClient();
    const { data, error } = await supabase
      .from('bylaws')
      .select(
        'id, created_at, section_number, section_title, description, bylaw_text, in_a_nutshell'
      )
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data ?? null
  } catch (error) {
    console.error('Error fetching bylaws:', error);
    return null;
  }
};

export const getAllBylaws = async () => {
  try {
    const supabase = await serverClient();

    const { data, error } = await supabase
      .from('bylaws')
      .select('id, created_at, section_number, section_title, description, bylaw_text, in_a_nutshell')
      .order('created_at', { ascending: true })

    if (error) throw error;

    return data && data.length > 0 ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllBylawIds = async () => {
  try {
    const supabase = browserClient();

    const { data, error } = await supabase
      .from('bylaws')
      .select('id')

    if (error) throw error;

    return data && data.length > 0 ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBylawById = async (id: string) => {
  try {
    const supabase = await serverClient();

    const { data, error } = await supabase
      .from('bylaws')
      .select('id, created_at, section_number, section_title, description, bylaw_text, in_a_nutshell')
      .match({ id })
      .single()

    if (error) throw error;

    return data ?? null
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postNewFeaturedBylaw = async ({
  sectionNumber,
  sectionTitle,
  description,
  bylawText,
  inANutshell
}: PostNewFeaturedBylawType): Promise<ReturnsErrorMsg> => {
  try {
    const supabase = browserClient();

    const { error } = await supabase
      .from('bylaws')
      .insert({
        section_number: sectionNumber,
        section_title: sectionTitle,
        description: description,
        bylaw_text: sanitizeHTML(bylawText),
        in_a_nutshell: sanitizeHTML(inANutshell)
      });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const updateBylaw = async ({
  id,
  sectionNumber,
  sectionTitle,
  description,
  bylawText,
  inANutshell
}: BylawParamsType): Promise<ReturnsErrorMsg> => {
  try {
    const supabase = browserClient();

    const { error } = await supabase
      .from('bylaws')
      .update({
        section_number: sectionNumber,
        section_title: sectionTitle,
        description: description,
        bylaw_text: sanitizeHTML(bylawText),
        in_a_nutshell: sanitizeHTML(inANutshell)
      })
      .eq('id', id)

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const getBoardObservations = async (): Promise<BoardObservationsContentType | null> => {
  try {
    const supabase = await serverClient()

    const { data, error } = await supabase
      .from('board_observations')
      .select('id, last_updated, content')
      .single();

    if (error) throw error;

    return data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getBoardObsId = async () => {
  try {
    const supabase = browserClient();
  
    const { data, error } = await supabase
      .from('board_observations')
      .select('id')
      .single();
  
    if (error) throw error;
    
    return data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const updateBoardObservations = async (content: string): Promise<ReturnsErrorMsg> => {
  try {
    const supabase = browserClient();

    const data = await getBoardObsId()

    const { error } = await supabase
      .from('board_observations')
      .update({
        last_updated: new Date(),
        content: sanitizeHTML(content),
      })
      .eq('id', data?.id );

    if (error) throw error;

    return { errorMessage: null }
  } catch(error) {
    return { errorMessage: getErrorMessage(error) }
  }
};