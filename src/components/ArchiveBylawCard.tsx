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
      className="transition-all bg-beige text-gray-text shadow-sm hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
      >
        <div className='grid grid-cols-3 md:grid-cols-7 justify-center items-center gap'>
          <div className='font-bold text-center border border-white h-full p-2'>{formatDate(createdAt as string)}</div>
          <div className='font-bold text-center border border-white h-full p-2'>{sectionNumber}</div>
          <div className='font-bold text-center border border-white h-full p-2'>{sectionTitle}</div>
          <div className='col-span-4 hidden md:block border border-white h-full p-2'>{description}</div>
        </div>
    </div>
  );
}
