import SignOutBtn from './SignOutBtn';

export default function Header({ userName }: { userName: string | null }) {
  return (
    <header className="bg-slate-800 text-white text-lg shadow-md p-6 w-full">
      <div className="flex justify-end">
        <SignOutBtn userName={userName} />
      </div>
    </header>
  );
}
