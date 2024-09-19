"use client";

import { User } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export default function HeaderNav({ admin }: { admin: User | null }) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/' && (
        <>
          <Header admin={admin} />
          <Navigation admin={admin} />
        </>
      )}
    </>
  );
}