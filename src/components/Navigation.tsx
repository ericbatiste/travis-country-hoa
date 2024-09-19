'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { useState, useEffect, useRef } from 'react';

export default function Navigation({ admin }: { admin: User | null }) {
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    switch (path) {
      case '/admin-dashboard':
        return pathname.startsWith('/admin-dashboard');
      case '/archive':
        return pathname.startsWith('/archive');
      default:
        return pathname === path;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 flex justify-center w-full py-2 bg-terracotta">
      <ul className="flex gap-2 md:gap-8 w-min text-xs md:text-xl text-white">
        <li
          className={`transition-all whitespace-nowrap  ${
            isActive('/monthly-feature')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/monthly-feature">Monthly Feature</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/in-a-nutshell')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/in-a-nutshell">In A Nutshell</Link>
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/board-action')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/board-action">Board Action</Link>
        </li>
        <li
          className={`relative transition-all whitespace-nowrap ${
            isActive('/archive')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black'
              : 'text-shadow hover:text-gray-cool'
          }`}
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <span className="cursor-pointer">Archive</span>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-[-1.1rem] md:left-[-1.5rem] flex flex-col gap-4 px-4 md:px-6 py-2 md:py-4 mt-2 bg-blue text-white shadow-lg z-10"
            >
              <Link
                href="/archive/bylaws"
                className="hover:text-terracotta text-shadow font-normal"
              >
                Bylaw Archive
              </Link>
              <Link
                href="/archive/board-action"
                className="hover:text-terracotta text-shadow font-normal"
              >
                Board Action Archive
              </Link>
            </div>
          )}
        </li>
        <li
          className={`transition-all whitespace-nowrap ${
            isActive('/contact-us')
              ? 'text-gray-text hover:text-gray-text text-shadow-a font-black'
              : 'text-shadow hover:text-gray-cool'
          }`}
        >
          <Link href="/contact-us">Contact Us</Link>
        </li>
        {admin && (
          <li
            className={`transition-all ${
              isActive('/admin-dashboard')
                ? 'text-gray-text hover:text-gray-text text-shadow-a font-black'
                : 'text-shadow hover:text-gray-cool'
            }`}
          >
            <Link href="/admin-dashboard/featured-monthly-editor">Admin</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
