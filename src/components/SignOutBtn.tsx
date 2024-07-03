'use client';

import { signOutAction } from '@/actions/users';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("Log out success, Goodbye!");
        router.push("/login");
      }
    });
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        {isPending ? <Loader2 className="animate-spin" />: "Log out"}
      </button>
    </>
  );
}
