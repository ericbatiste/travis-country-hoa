import { sanitizeHTML } from '../sanitizeHtml';
import { getErrorMessage } from '../errorMsg';
import { browserClient } from './client';
import { serverClient } from './server';
import {
  PostNewFeaturedBylawType,
  FeaturedBylawContentType,
  BoardObservationsContentType,
  ReturnsErrorMsg,
  BylawParamsType
} from '../types';

export const verifyUserEmail = async (formData: FormData) => {
  try {
    const supabase = browserClient();
    const email = formData.get('email');
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email);

    if (error) throw error
    
    return data
  } catch (error) {
    console.error(error);
    return null
  }
}

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
      .select('id, created_at, section_number, section_title, description, bylaw_text, in_a_nutshell')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data ?? null
  } catch (error) {
    console.error(error);
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

export const fetchBoardActionsClient = async () => {
  try {
    const supabase = browserClient()

    const { data, error } = await supabase
      .from('board_observations')
      .select('id, created_at, content')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getBoardActionContent = async (): Promise<BoardObservationsContentType | null> => {
  try {
    const supabase = await serverClient()

    const { data, error } = await supabase
      .from('board_observations')
      .select('id, created_at, content')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    return data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postNewBoardAction = async (content: string) => {
  try {
    const supabase = browserClient();

    const { error } = await supabase
      .from('board_observations')
      .insert({ content: sanitizeHTML(content) });
    
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export const updateBoardAction = async (
  id: string,
  content: string
): Promise<ReturnsErrorMsg> => {
  try {
    const supabase = browserClient();

    const { error } = await supabase
      .from('board_observations')
      .update({
        content: sanitizeHTML(content)
      })
      .eq('id', id);

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};