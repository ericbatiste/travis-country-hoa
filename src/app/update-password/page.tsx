'use client';

import { updatePasswordAction } from '../auth/actions';
import { useState, useTransition, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match!');
    }

    startTransition(async () => {
      const { errorMessage } = await updatePasswordAction(password);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success('Password updated successfully!');
        router.push('/');
      }
    });
  };

  return (
    <div className="max-h-screen flex justify-center mt-20">
      <form
        onSubmit={handleSubmitPassword}
        className="flex flex-col gap-4 bg-gray-cool p-6 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl text-center">Create New Password</h2>
        <div>
          <label htmlFor="password" className="block text-lg mb-2">
            Enter Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            disabled={isPending}
            className="mt-1 block w-full p-2 border border-gray-warm rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-lg mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            required
            disabled={isPending}
            className="mt-1 block w-full p-2 border border-gray-warm rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
          />
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue hover:underline focus:outline-none"
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue text-white text-lg py-1 px-6 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50 w-full"
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Update Password'}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.push('/reset-password')}
            className="text-lg text-blue hover:underline focus:outline-none"
          >
            Email password reset link.
          </button>
        </div>
      </form>
    </div>
  );
}
