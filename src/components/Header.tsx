import SignOutBtn from './SignOutBtn';
import { User } from '@supabase/supabase-js';

export default function Header({ admin }: { admin: User | null }) {
  return (
    <header className="flex justify-end bg-slate-800 text-white text-lg shadow-md p-6 w-full">
      <p className="italic">Know your rights as property owners and members of the TCCSA!</p>
      {admin && (
        <div className="ml-20">
          <SignOutBtn />
        </div>
      )}
    </header>
  );
}
