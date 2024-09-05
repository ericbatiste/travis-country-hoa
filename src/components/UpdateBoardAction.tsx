import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import BoardActionEditor from './BoardActionEditor';
import UpdateBoardCard from './UpdateBoardCard';
import { useState, useEffect, useTransition } from 'react';
import { BoardActionEditorProps, GetBoardActionsType } from '@/utils/types';
import { fetchBoardActionsClient } from '@/utils/supabase/actions';

export default function UpdateBoardAction({
  editingSection,
  selectedAction,
  setSelectedAction
}: BoardActionEditorProps) {
  const [boardActions, setBoardActions] = useState<GetBoardActionsType[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const actions = await fetchBoardActionsClient();
        actions && setBoardActions(actions);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  }, [startTransition]);

  return (
    <>
      {isPending ? (
        <div className="flex mt-20 justify-center min-w-full">
          <Loader2 className="animate-spin text-green" size={80} />
        </div>
      ) : !selectedAction ? (
        <div className="my-8 w-3/4">
          <div className="space-y-4">
            {boardActions?.map(action => (
              <UpdateBoardCard
                key={action.id}
                id={action.id}
                createdAt={action.created_at}
                boardActions={boardActions}
                setSelectedAction={setSelectedAction}
              />
            ))}
          </div>
        </div>
      ) : (
        <BoardActionEditor
          editingSection={editingSection}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}
    </>
  );
}
