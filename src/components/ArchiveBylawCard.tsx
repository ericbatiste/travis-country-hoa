'use client';

import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

export default function ArchiveBylawCard({
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
      key={id}
      className="border p-4 rounded-lg cursor-pointer hover:shadow-lg flex"
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0 w-2/5 space-x-8 flex">
        <p className="whitespace-nowrap">{formatDate(createdAt as string)}</p>
        <p className="whitespace-nowrap">Section: {sectionNumber}</p>
        <p>{sectionTitle}</p>
      </div>
      <div className="px-4">
        <p>{description}</p>
      </div>
    </div>
  );
}
