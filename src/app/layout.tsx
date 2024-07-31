import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { getAuthUser } from '@/actions/users';
import { defineAdmin, getUserName } from '@/actions/apiCalls';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Our Travis Country',
  description: 'Informative blog and bylaw archive exclusively for members of the TCCSA.'
};

export const revalidate = 0;

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthUser();
  const { admin } = await defineAdmin(user?.email);
  const userName = await getUserName(user?.email);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {user && <Header userName={userName} />}
        <div className="flex flex-grow">
          {user && (
            <aside className="w-1/6 p-8 bg-gray-100">
              <Navigation admin={admin} />
            </aside>
          )}
          <main className="flex-1 p-4">{children}</main>
        </div>
        {user && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
