'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="sticky top-[3.7rem] flex justify-center rounded-md shadow-lg w-min py-6 px-4 bg-blue">
      <ul className="flex flex-col gap-2 md:gap-4 w-min text-sm md:text-xl text-white">
        <li
          className={`transition-all text-shadow whitespace-nowrap ${
            isActive('/admin-dashboard/content-editor')
              ? 'text-terracotta hover:text-terracotta font-black scale-y-125'
              : 'hover:text-gray-cool'
          }`}
        >
          <Link href="/admin-dashboard/content-editor">Content Editor</Link>
        </li>
        <li
          className={`transition-all text-shadow ${
            isActive('/admin-dashboard/mailer')
              ? 'text-terracotta hover:text-terracotta font-black scale-y-125'
              : 'hover:text-gray-cool'
          }`}
        >
          <Link href="/admin-dashboard/mailer">Mailer</Link>
        </li>
        <li
          className={`transition-all text-shadow whitespace-nowrap ${
            isActive('/admin-dashboard/mailing-list')
              ? 'text-terracotta hover:text-terracotta font-black scale-y-125'
              : 'hover:text-gray-cool'
          }`}
        >
          <Link href="/admin-dashboard/mailing-list">Mailing List</Link>
        </li>
      </ul>
    </div>
  );
}
