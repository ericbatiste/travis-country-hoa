'use client';

import Link from 'next/link';
import SignOutBtn from './SignOutBtn';
import { useEffect, useState } from 'react';
import { defineAdmin } from '@/actions/users';

export default function Header() {
  const [admin, setAdmin] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const currentAdmin = await defineAdmin();
      setAdmin(currentAdmin);
    };

    fetchAdmin();
  }, []);

  return (
    <header className="bg-gray-800 text-white shadow-md p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="hover:font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link href="/board-observations" className="hover:font-bold">
              Current Board Observations
            </Link>
          </li>
          <li>
            <Link href="/archive" className="hover:font-bold">
              Archive
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:font-bold">
              Contact Us
            </Link>
          </li>
          {admin && (
            <li>
              <Link href="/admin-dashboard" className="hover:font-bold">
                Admin
              </Link>
            </li>
          )}
        </ul>
        <SignOutBtn />
      </nav>
    </header>
  );
}
