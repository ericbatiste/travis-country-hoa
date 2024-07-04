'use server';

import { serverClient } from '@/utils/supabase/server';
import { getErrorMessage } from '@/utils/errorMsg';
import { getAdmins } from './apiCalls';

export async function loginAction(formData: FormData) {
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

export async function otpLoginAction(formData: FormData) {
  try {
    const { auth } = await serverClient();

    const {
      data: { session },
      error
    } = await auth.verifyOtp({
      email: formData.get('email') as string,
      token: formData.get('token') as string,
      type: 'email'
    });

    if (error) throw error;

    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updatePasswordAction = async (password: string) => {
  try {
    const { auth } = await serverClient();

    const {
      data: { user }
    } = await auth.getUser();

    if (!user) {
      throw new Error('No active session found. Please log in again.');
    }

    const { error } = await auth.updateUser({ password });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export async function approveUserAction(email: string) {
  try {
    const { auth } = await serverClient();

    const { error } = await auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: 'http://localhost:3000/auth/otp-login'
      }
    });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

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

export const defineAdmin = async (): Promise<string | null> => {
  try {
    const { auth } = await serverClient();
    const admins = await getAdmins();
    const {
      data: { user }
    } = await auth.getUser();
    const currentAdmin = user?.email ?? null;

    if (!admins?.includes(currentAdmin)) {
      throw new Error('Unable to define admin.');
    } else {
      return currentAdmin;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
