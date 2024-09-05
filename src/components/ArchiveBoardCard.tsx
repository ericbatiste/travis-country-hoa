'use client';

import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

export default function ArchiveBoardCard({
  id,
  createdAt,
  description,
}: {
  id?: string;
  createdAt?: string;
  description?: string;
}) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/archive/board-action/${id}`);
  };

  return (
    <div
      key={id}
      className="transition-all p-4 bg-beige text-gray-text shadow-sm hover:shadow-lg cursor-pointer rounded-sm flex gap-4"
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0 flex items-center justify-around space-x-4 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
        <p className="min-[500px]:whitespace-nowrap text-center">{formatDate(createdAt as string)}</p>
      </div>
      <div className="hidden sm:block flex-grow sm:ml-4">
        <p className="line-clamp-4">{description}</p>
      </div>
    </div>
  );
}