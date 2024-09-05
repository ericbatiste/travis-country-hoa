'use client';

import { formatDate } from '@/utils/formatDate';
import { UpdateBylawCardProps } from '@/utils/types';

export default function UpdateFeaturedCard({
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
      className="flex justify-around border p-4 rounded-lg cursor-pointer hover:shadow-lg"
      onClick={handleCardClick}
    >
      <p className="whitespace-nowrap">{formatDate(createdAt)}</p>
      <p className="whitespace-nowrap">Section: {sectionNumber}</p>
      <p>{sectionTitle}</p>
    </div>
  );
}


