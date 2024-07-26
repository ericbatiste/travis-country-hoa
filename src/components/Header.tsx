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
          <li className="transition-transform hover:scale-110">
            <Link href="/">
              Home
            </Link>
          </li>
          <li className="transition-transform hover:scale-110">
            <Link href="/board-observations">
              Current Board Observations
            </Link>
          </li>
          <li className="transition-transform hover:scale-110">
            <Link href="/archive">
              Archive
            </Link>
          </li>
          <li className="transition-transform hover:scale-110">
            <Link href="/contact-us">
              Contact Us
            </Link>
          </li>
          {admin && (
            <li className="transition-transform hover:scale-110">
              <Link href="/admin-dashboard">
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
