import SignOutBtn from './SignOutBtn';
import { User } from '@supabase/supabase-js';

export default function Header({ admin }: { admin: User | null }) {
  return (
    <header className='bg-blue text-beige shadow-md w-full'>
      <div className='flex justify-between items-center px-4 md:px-10 py-2 md:py-6'>
        <div className='space-y-4'>
          <h1 className="font-serif text-3xl md:text-5xl">Our Travis Country</h1>
          <p className="italic text-lg md:text-2xl">Know your rights as property owners and members of the TCCSA!</p>
        </div>
        {admin && (
          <SignOutBtn />
        )}
      </div>
    </header>
  );
}
