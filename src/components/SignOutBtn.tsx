'use client';

import { signOutAction } from '@/actions/users';
import { useEffect, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, CircleUserRound } from 'lucide-react';
import { getUserName } from '@/actions/apiCalls';

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();
  const [userName, setUserName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchName = async () => {
      const name = await getUserName();
      if (name) setUserName(name);
    };

    fetchName();
  }, []);

  const handleLogout = async () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success('Log out success, Goodbye!');
        router.push('/login');
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      {userName && (
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered ? (
            <>
              <p>Howdy {userName}!</p>
              <CircleUserRound size={30} strokeWidth={1.25} />
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Log out"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
