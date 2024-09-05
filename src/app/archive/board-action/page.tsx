import { getAllBoardActions } from '@/utils/supabase/actions';
import ArchiveBoardCard from '@/components/ArchiveBoardCard';

export default async function Archive() {
  const actions = await getAllBoardActions();

  return (
    <div className="px-4 lg:px-20 my-4">
      <h1 className="my-6 md:my-10 text-2xl md:text-5xl font-semibold text-blue text-center">
        Board Action Archive
      </h1>
      <div className="space-y-4">
        {actions?.map(action => (
          <ArchiveBoardCard
            key={action.id}
            id={action.id}
            createdAt={action.created_at}
            description={action.description}
          />
        ))}
      </div>
    </div>
  );
}
