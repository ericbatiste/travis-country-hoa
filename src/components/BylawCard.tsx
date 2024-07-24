'use client';

import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

export default function BylawCard({
  id,
  createdAt,
  sectionNumber,
  sectionTitle,
  description
}: {
  id?: string;
  createdAt?: string;
  sectionNumber?: string;
  sectionTitle?: string;
  description?: string;
}) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/archive/${id}`);
  };

  return (
    <div
      key={sectionNumber}
      className="border p-4 rounded cursor-pointer hover:shadow-lg flex"
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0 w-2/5 space-x-10 flex">
        <p className="whitespace-nowrap">{formatDate(createdAt as string)}</p>
        <p className="whitespace-nowrap">Section: {sectionNumber}</p>
        <p>{sectionTitle}</p>
      </div>
      <div className="w-3/5">
        <p>{description}</p>
      </div>
    </div>
  );
}
