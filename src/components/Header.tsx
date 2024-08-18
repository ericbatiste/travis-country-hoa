import NavMenuBtn from './NavMenuBtn';
import SignOutBtn from './SignOutBtn';
import { User } from '@supabase/supabase-js';

export default function Header({ admin }: { admin: User | null }) {
  return (
    <header className="relative flex justify-between bg-blue text-beige text-xl shadow-md p-5 md:p-10 w-full">
      <NavMenuBtn admin={admin} />
      <p className="italic font-serif text-3xl hidden md:block">Our Travis Country</p>
      {admin && (
          <SignOutBtn />
      )}
    </header>
  );
}
