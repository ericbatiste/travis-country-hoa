'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ admin }: { admin: boolean }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <ul className="space-y-4 w-min">
      <li
        className={`transition-all font-semibold ${
          isActive('/') ? 'text-indigo-600' : 'hover:text-indigo-600 cursor-pointer'
        } hover:text-indigo-600`}
      >
        <Link href="/">Home</Link>
      </li>
      <li
        className={`transition-all font-semibold ${
          isActive('/board-observations') ? 'text-indigo-600' : 'hover:text-indigo-600 cursor-pointer'
        }`}
      >
        <Link href="/board-observations">Observations</Link>
      </li>
      <li
        className={`transition-all font-semibold ${
          isActive('/archive') ? 'text-indigo-600' : 'hover:text-indigo-600 cursor-pointer'
        }`}
      >
        <Link href="/archive">Archive</Link>
      </li>
      <li
        className={`transition-all font-semibold ${
          isActive('/contact-us') ? 'text-indigo-600' : 'hover:text-indigo-600 cursor-pointer'
        }`}
      >
        <Link href="/contact-us">Contact Us</Link>
      </li>
      {admin && (
        <li
          className={`transition-all font-semibold ${
            isActive('/admin-dashboard') ? 'text-indigo-600' : 'hover:text-indigo-600 cursor-pointer'
          }`}
        >
          <Link href="/admin-dashboard">Admin</Link>
        </li>
      )}
    </ul>
  );
}
