'use client';

import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-40">
      <h1 className="text-3xl font-bold text-terracotta">Oops!</h1>
      <p className="text-lg text-grey-text">Sorry, something went wrong.</p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-2 text-white bg-blue rounded-md hover:bg-green transition duration-200"
      >
        Go Back Home
      </button>
    </div>
  );
}
