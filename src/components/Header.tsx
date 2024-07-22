'use client';

import Link from 'next/link';
import SignOutBtn from './SignOutBtn';
import { useEffect, useState } from 'react';
import { defineAdmin } from '@/actions/users';

type Admin = string | null;

export default function Header() {
  const [admin, setAdmin] = useState<Admin>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const currentAdmin = await defineAdmin();
      setAdmin(currentAdmin);
    };

    fetchAdmin();
  }, []);

  return (
    <header className="bg-gray-800 text-white shadow-md p-4">
      <nav className="container mx-auto flex justify-end items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/board-observations">Current Board Observations</Link>
          </li>
          <li>
            <Link href="/archive">Archive</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          {admin && (
            <li>
              <Link href="/admin-dashboard">Admin</Link>
            </li>
          )}
          <li>
            <SignOutBtn />
          </li>
        </ul>
      </nav>
    </header>
  );
}
