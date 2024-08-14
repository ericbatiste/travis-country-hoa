"use client"

import { loginAction } from '@/actions/users';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickLoginButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(formData);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("Successfully logged in");
        router.push("/");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form action={handleClickLoginButton} className="bg-gray-cool p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-light mb-5 text-center text-gray-text">Admin Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-text text-lg mb-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder='Email'
            disabled={isPending}
          className="mt-1 block w-full p-2 border border-gray-warm rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-text text-lg mb-2">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder='Password'
            disabled={isPending}
            className="mt-1 block w-full p-2 border border-gray-warm rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={isPending}
            className="bg-blue text-beige text-lg py-2 px-4 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50"
            >
            {isPending ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
