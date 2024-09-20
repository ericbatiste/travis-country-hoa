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
      className="transition-all p-4 bg-beige text-gray-text shadow-sm hover:shadow-lg cursor-pointer rounded-sm border border-gray-warm flex gap-4"
      onClick={handleCardClick}
      >
      <div className="flex-shrink-0 flex items-center justify-around space-x-4 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
        <p className="min-[500px]:whitespace-nowrap text-center">{formatDate(createdAt as string)}</p>
        <p className="font-medium min-[500px]:whitespace-nowrap text-center">Section: {sectionNumber}</p>
        <h3 className="text-lg font-semibold min-[500px]:whitespace-nowrap text-center">{sectionTitle}</h3>
      </div>
      <div className="hidden sm:block flex-grow sm:ml-4">
        <p className="line-clamp-4">{description}</p>
      </div>
    </div>
  );
}
