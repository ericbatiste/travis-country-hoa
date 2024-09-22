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
      className="transition-all p-1 bg-beige text-gray-text shadow-sm hover:shadow-lg cursor-pointer rounded-sm border border-gray-warm"
      onClick={handleCardClick}
      >
        <div className='grid grid-cols-3 md:grid-cols-7 justify-center items-center gap-2'>
          <div className='font-bold text-center'>{formatDate(createdAt as string)}</div>
          <div className='font-bold text-center'>{sectionNumber}</div>
          <div className='font-bold text-center'>{sectionTitle}</div>
          <div className='col-span-4 px-2 hidden md:block'>{description}</div>
        </div>
    </div>
  );
}
