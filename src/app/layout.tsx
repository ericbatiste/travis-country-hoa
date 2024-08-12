import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { getAuthUser } from '@/actions/users';
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
  const admin = await getAuthUser()

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header admin={admin} />
        <div className="flex flex-grow">
            <aside className="p-8 bg-gray-100 w-min md:w-1/6">
              <Navigation admin={admin} />
            </aside>
          <main className="flex-1 p-4">{children}</main>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
