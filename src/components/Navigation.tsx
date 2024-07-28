'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ admin }: { admin: boolean }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <ul className="space-y-4">
      <li
        className={`transition-all font-semibold ${
          isActive('/') ? 'text-blue-600' : 'hover:text-blue-600'
        } hover:text-blue-600`}
      >
        <Link href="/">Home</Link>
      </li>
      <li
        className={`transition-all font-semibold ${
          isActive('/board-observations') ? 'text-blue-600' : 'hover:text-blue-600'
        }`}
      >
        <Link href="/board-observations">Observations</Link>
      </li>
      <li
        className={`transition-all font-semibold ${
          isActive('/archive') ? 'text-blue-600' : 'hover:text-blue-600'
        }`}
      >
        <Link href="/archive">Archive</Link>
      </li>
      <li
        className={`transition-all font-semibold ${
          isActive('/contact-us') ? 'text-blue-600' : 'hover:text-blue-600'
        }`}
      >
        <Link href="/contact-us">Contact Us</Link>
      </li>
      {admin && (
        <li
          className={`transition-all font-semibold ${
            isActive('/admin-dashboard') ? 'text-blue-600' : 'hover:text-blue-600'
          }`}
        >
          <Link href="/admin-dashboard">Admin</Link>
        </li>
      )}
    </ul>
  );
}
