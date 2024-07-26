'use client';

import { signOutAction } from '@/actions/users';
import { useEffect, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, CircleUserRound, ChevronDown, ChevronUp } from 'lucide-react';
import { getUserName } from '@/actions/apiCalls';

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
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
    <div className="relative">
      {userName && (
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <p>Howdy {userName}!</p>
          <CircleUserRound size={30} strokeWidth={1.25} />
          {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      )}
      {isDropdownOpen && (
        <div className="absolute mt-2 right-0 bg-gray-800 shadow-md rounded-lg py-2 w-32">
          <button
            onClick={handleLogout}
            className="text-white px-4 py-2 w-full text-left hover:font-bold"
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Log out'}
          </button>
        </div>
      )}
    </div>
  );
}

