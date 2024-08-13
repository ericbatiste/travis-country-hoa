'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Navigation({ admin }: { admin: User | null}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <ul className="space-y-10 w-min text-2xl font-light">
      <li
        className={`transition-all ${
          isActive('/') ? 'text-terracotta' : 'text-gray-text hover:cursor-pointer'
        } hover:text-terracotta`}
      >
        <Link href="/">Home</Link>
      </li>
      <li
        className={`transition-all ${
          isActive('/board-observations') ? 'text-terracotta' : 'text-gray-text hover:cursor-pointer'
        } hover:text-terracotta`}
      >
        <Link href="/board-observations">Observations</Link>
      </li>
      <li
        className={`transition-all ${
          isActive('/archive') ? 'text-terracotta' : 'text-gray-text hover:cursor-pointer'
        } hover:text-terracotta`}
      >
        <Link href="/archive">Archive</Link>
      </li>
      <li
        className={`transition-all ${
          isActive('/contact-us') ? 'text-terracotta' : 'text-gray-text hover:cursor-pointer'
        } hover:text-terracotta`}
      >
        <Link href="/contact-us">Contact Us</Link>
      </li>
      {admin && (
        <li
          className={`transition-all ${
            isActive('/admin-dashboard') ? 'text-terracotta' : 'text-gray-text hover:cursor-pointer'
          } hover:text-terracotta`}
        >
          <Link href="/admin-dashboard">Admin</Link>
        </li>
      )}
    </ul>
  );
}
