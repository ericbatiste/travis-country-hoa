'use client';

import { signOutAction } from '@/actions/users';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, CircleUserRound, ChevronDown, ChevronUp } from 'lucide-react';

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        setIsDropdownOpen(false);
        toast.success('Log out success, Goodbye!');
        router.push('/');
      }
    });
  };

  return (
    <>
      <div
        className="flex items-center space-x-1 cursor-pointer transition-all hover:scale-105"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <CircleUserRound size={35} strokeWidth={1.5} color={isDropdownOpen ? '#AD5F40' : 'beige'}/>
        {isDropdownOpen ? (
          <ChevronUp size={35} strokeWidth={1.75} color={isDropdownOpen ? '#AD5F40' : 'beige'}/>
        ) : (
          <ChevronDown size={35} strokeWidth={1.75} color={isDropdownOpen ? '#AD5F40' : 'beige'}/>
        )}
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 top-full bg-beige shadow-md rounded-md py-2 pr-8 w-full">
          <button onClick={handleLogout} className="px-4 py-2 w-full text-gray-text text-right hover:text-terracotta">
            {isPending ? <Loader2 className="animate-spin" /> : 'Log out'}
          </button>
        </div>
      )}
    </>
  );
}
