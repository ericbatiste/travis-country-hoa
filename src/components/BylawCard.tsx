'use client';

import { useRouter } from 'next/navigation';

export default function BylawCard({
  id,
  sectionNumber,
  sectionTitle
} : {
  id?: string;
  sectionNumber?: string;
  sectionTitle?: string;
}) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/archive/${id}`);
  };

  return (
    <>
      <div
        key={sectionNumber}
        className="border p-4 rounded cursor-pointer hover:shadow-lg"
        onClick={handleCardClick}
      >
        <h2 className="text-xl font-semibold">Section: {sectionNumber}</h2>
        <p className="text-lg text-gray-600 font-semibold">{sectionTitle}</p>
      </div>
    </>
  );
}
