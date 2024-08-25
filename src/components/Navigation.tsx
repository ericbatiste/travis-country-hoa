'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Navigation({ admin }: { admin: User | null }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="sticky top-0 flex justify-center md:justify-end w-full py-2 px-10 bg-terracotta">
      <ul className="flex gap-4 md:gap-8 w-min text-xs md:text-xl font-semibold">
        <li
          className={`transition-all ${
            isActive('/') ? 'text-blue' : 'text-beige hover:cursor-pointer'
          } hover:text-blue`}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/in-a-nutshell') ? 'text-blue' : 'text-beige hover:cursor-pointer'
          } hover:text-blue`}
        >
          <Link href="/in-a-nutshell">In A Nutshell</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/board-observations') ? 'text-blue' : 'text-beige hover:cursor-pointer'
          } hover:text-blue`}
        >
          <Link href="/board-observations">Our Board</Link>
        </li>
        <li
          className={`transition-all ${
            isActive('/archive') ? 'text-blue' : 'text-beige hover:cursor-pointer'
          } hover:text-blue`}
        >
          <Link href="/archive">Archive</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/contact-us') ? 'text-blue' : 'text-beige hover:cursor-pointer'
          } hover:text-blue`}
        >
          <Link href="/contact-us">Contact Us</Link>
        </li>
        {admin && (
          <li
            className={`transition-all ${
              isActive('/admin-dashboard') ? 'text-blue' : 'text-beige hover:cursor-pointer'
            } hover:text-blue`}
          >
            <Link href="/admin-dashboard">Admin</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
