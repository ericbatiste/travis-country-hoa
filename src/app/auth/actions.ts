'use server';

import { serverClient } from '@/utils/supabase/server';
import { getErrorMessage } from '@/utils/errorMsg';
import { headers } from 'next/headers';

export const getAuthUser = async () => {
  try {
    const { auth } = await serverClient();
    const {
      data: { user }
    } = await auth.getUser();

    return user ?? null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const loginAction = async (formData: FormData) => {
  try {
    const { auth } = await serverClient();

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };

    const { error } = await auth.signInWithPassword(data);

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export const resetPasswordAction = async (formData: FormData) => {
  try {
    const { auth } = await serverClient();
    const origin = headers().get('origin');
    const email = formData.get('email') as string

    const { error } = await auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/update-password`,
    })
    
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export const updatePasswordAction = async (password: string) => {
  try {
    const { auth } = await serverClient();

    const {
      data: { user }
    } = await auth.getUser();

    if (!user) {
      throw new Error('No active session found. Please log in or request new password reset link.');
    }

    const { error } = await auth.updateUser({ password });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signOutAction = async () => {
  try {
    const { auth } = await serverClient();

    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};