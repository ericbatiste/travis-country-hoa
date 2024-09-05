'use client';

import { formatDate } from '@/utils/formatDate';
import { UpdateBoardCardProps } from '@/utils/types';

export default function UpdateBoardCard({
  id,
  createdAt,
  boardActions,
  setSelectedAction,
}: UpdateBoardCardProps) {
  
  const handleCardClick = () => {
    const selected = boardActions.find(action => id === action.id);
    if (selected) {
      setSelectedAction(selected);
    }
  };

  return (
    <div
      className="flex justify-around border p-4 rounded-lg cursor-pointer hover:shadow-lg"
      onClick={handleCardClick}
    >
      <p className="whitespace-nowrap">{formatDate(createdAt)}</p>
    </div>
  );
}