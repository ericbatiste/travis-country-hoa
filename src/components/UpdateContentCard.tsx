'use client';

import { formatDate } from '@/utils/formatDate';
import { UpdateBylawCardProps } from '@/utils/types';

export default function UpdateContentCard({
  id,
  createdAt,
  sectionNumber,
  sectionTitle,
  bylaws,
  setSelectedBylaw,
}: UpdateBylawCardProps) {
  
  const handleCardClick = () => {
    const selected = bylaws.find(bylaw => id === bylaw.id);
    selected && setSelectedBylaw(selected);
  };

  return (
    <div
      className="flex flex-col space-y-2 border p-6 rounded-lg cursor-pointer hover:shadow-lg"
      onClick={handleCardClick}
    >
      <p className="whitespace-nowrap "><span className='font-bold'>Uploaded:</span> {formatDate(createdAt)}</p>
      <p className=''><span className='font-bold'>Section:</span> {sectionNumber}</p>
      <p className=''><span className='font-bold'>Title:</span> {sectionTitle}</p>
    </div>
  );
}


