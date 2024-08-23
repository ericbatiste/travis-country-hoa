import NavMenuBtn from './NavMenuBtn';
import SignOutBtn from './SignOutBtn';
import { User } from '@supabase/supabase-js';

export default function Header({ admin }: { admin: User | null }) {
  return (
    <header className={`relative flex justify-between lg:justify-center ${admin && 'lg:justify-between'} bg-blue text-beige shadow-md p-5 md:p-10 w-full`}>
      <NavMenuBtn admin={admin} />
      <p className="italic font-serif text-3xl md:text-5xl">Our Travis Country</p>
      {admin && (
          <SignOutBtn />
      )}
    </header>
  );
}
