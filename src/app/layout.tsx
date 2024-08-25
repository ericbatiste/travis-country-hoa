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
  const admin = await getAuthUser();

  return (
    <html lang="en">
      <body className={`${inter.className} max-h-screen flex flex-col`}>
        <Header admin={admin} />
        <Navigation admin={admin} />
        <main className="flex-1 pb-28">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
