import SignOutBtn from './SignOutBtn';
import { User } from '@supabase/supabase-js';

export default function Header({ admin }: { admin: User | null }) {
  return (
    <header className="relative shadow-md w-full py-4 md:py-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#a8c8c0] to-[#d6d3cc] z-0" />
      <div
        className="absolute inset-0 bg-no-repeat bg-cover saturate-150 z-10"
        style={{ backgroundImage: "url('/marymoorefalls.png')", backgroundPosition: '50% 25%' }}
      />
      <div className="relative z-10 h-full flex justify-between px-4 md:px-10">
        <div className="space-y-2">
          <h1 className="font-serif text-white tracking-wide text-3xl md:text-6xl text-shadow">
            Our Travis Country...
          </h1>
          <p className="text-xl text-white  md:text-4xl text-shadow md:ml-10">
            examining our bylaws one section at a time.
          </p>
        </div>
        {admin && (
          <div className="">
            <SignOutBtn />
          </div>
        )}
      </div>
    </header>
  );
}
