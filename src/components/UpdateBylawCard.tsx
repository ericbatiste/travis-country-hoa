'use client';

import { formatDate } from '@/utils/formatDate';
import { UpdateBylawCardProps } from '@/actions/types';

export default function UpdateBylawCard({
  id,
  createdAt,
  sectionNumber,
  sectionTitle,
  bylaws,
  setSelectedBylaw,
}: UpdateBylawCardProps) {
  
  const handleCardClick = () => {
    const selected = bylaws.find(bylaw => id === bylaw.id);
    if (selected && setSelectedBylaw) {
      setSelectedBylaw(selected);
    }
  };

  return (
    <div
      className="border p-4 rounded-lg cursor-pointer hover:shadow-lg flex justify-around"
      onClick={handleCardClick}
    >
      <p className="whitespace-nowrap">{formatDate(createdAt)}</p>
      <p className="whitespace-nowrap">Section: {sectionNumber}</p>
      <p>{sectionTitle}</p>
    </div>
  );
}


