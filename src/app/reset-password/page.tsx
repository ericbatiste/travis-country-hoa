'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { resetPasswordAction } from '../auth/actions';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function ResetPassword() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickSendButton = async (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await resetPasswordAction(formData);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success('Success, check your email!');
      }
    });
  };

  return (
    <div className="max-h-screen flex justify-center mt-20">
      <form
        action={handleClickSendButton}
        className="flex flex-col gap-4 bg-gray-cool p-6 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl text-center">Reset Password</h2>
        <div>
          <label htmlFor="email" className="block text-lg mb-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            disabled={isPending}
            className="mt-1 block w-full p-2 border border-gray-warm rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
          />
        </div>
        <div className="flex items-center justify-center mt-2">
          <button
            disabled={isPending}
            className="bg-blue text-white text-lg py-1 px-6 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50"
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Send password reset email'}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-lg text-blue hover:underline focus:outline-none"
          >
            Return to login
          </button>
        </div>
      </form>
    </div>
  );
}
