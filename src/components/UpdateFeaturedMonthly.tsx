import { useState, useEffect, useTransition } from 'react';
import UpdateFeaturedCard from './UpdateFeaturedCard';
import FeaturedMonthlyEditor from './FeaturedMonthlyEditor';
import { GetBylawsType, FeaturedMonthlyEditorProps } from '@/utils/types';
import { fetchBylawsClient } from '@/utils/supabase/actions';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { Loader2 } from 'lucide-react';

export default function UpdateFeaturedMothly({
  editingSection,
  selectedBylaw,
  setSelectedBylaw
}: FeaturedMonthlyEditorProps) {
  const [bylaws, setBylaws] = useState<GetBylawsType[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const bylaws = await fetchBylawsClient();
        bylaws && setBylaws(bylaws);
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
      ) : !selectedBylaw ? (
        <div className="my-8 w-3/4">
          <div className="space-y-4">
            {bylaws?.map(bylaw => (
              <UpdateFeaturedCard
                key={bylaw.id}
                id={bylaw.id}
                createdAt={bylaw.created_at}
                sectionNumber={bylaw.section_number}
                sectionTitle={bylaw.section_title}
                bylaws={bylaws}
                setSelectedBylaw={setSelectedBylaw}
              />
            ))}
          </div>
        </div>
      ) : (
        <FeaturedMonthlyEditor
          editingSection={editingSection}
          selectedBylaw={selectedBylaw}
          setSelectedBylaw={setSelectedBylaw}
        />
      )}
    </>
  );
}
