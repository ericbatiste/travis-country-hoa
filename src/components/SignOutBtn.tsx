'use client';

import { signOutAction } from '@/app/auth/actions';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, CircleUserRound } from 'lucide-react';

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success('Log out success, Goodbye!');
        router.push('/');
      }
    });
  };

  return (
    <div
      onClick={handleLogout}
      className="group transition-all flex items-center bg-sob hover:bg-green p-4 space-x-2 shadow-xl border border-gray-text rounded-full cursor-pointer"
    >
      <CircleUserRound size={40} strokeWidth={1.75} color="white" />
      <p className="transition-all text-2xl text-white hidden group-hover:block">
        {isPending ? <Loader2 className="animate-spin" /> : 'Log out'}
      </p>
    </div>
  );
}
