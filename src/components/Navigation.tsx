'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Navigation({ admin }: { admin: User | null }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin-dashboard') {
      return pathname.startsWith('/admin-dashboard');
    }
    return pathname === path;
  };  

  return (
    <div className="sticky top-0 flex justify-center w-full py-2 bg-terracotta z-20">
      <ul className="flex gap-2 md:gap-8 w-min text-xs md:text-xl text-white">
        <li
          className={`transition-all whitespace-nowrap  ${
            isActive('/monthly-feature')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black scale-y-125'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/monthly-feature">Monthly Feature</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/in-a-nutshell')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black scale-y-125'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/in-a-nutshell">In A Nutshell</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/board-action')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black scale-y-125'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/board-action">Board Action</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/archive')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black scale-y-125'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/archive">Archive</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/contact-us')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black scale-y-125'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/contact-us">Contact Us</Link>
        </li>
        {admin && (
          <li
            className={`transition-all ${
              isActive('/admin-dashboard')
                ? 'text-gray-text hover:text-gray-text text-shadow-a font-black scale-y-125'
                : 'text-shadow hover:text-gray-cool'
            }`}
          >
            <Link href="/admin-dashboard/content-editor">Admin</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
