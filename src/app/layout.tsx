import type { Metadata } from 'next';
import { Lato, Cardo } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { getAuthUser } from './auth/actions';
import Footer from '@/components/Footer';
import HeaderNav from '@/components/HeaderAndNav';

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700', '900'] });
const cardo = Cardo({ subsets: ['latin'], weight: ['400', '700'] })

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
      <body className={`${lato.className}flex flex-col`}>
        <HeaderNav admin={admin}/>
        <main className="flex-1 pb-8 md:pb-12">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
