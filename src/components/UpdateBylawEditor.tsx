import { useState, useEffect, useTransition } from 'react';
import UpdateBylawCard from './UpdateBylawCard';
import FeaturedBylawEditor from './FeaturedBylawEditor';
import { AdminEditorProps, GetBylawsType } from '@/utils/types';
import { fetchBylawsClient } from '@/utils/supabase/actions';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { Loader2 } from 'lucide-react';

export default function UpdateBylawEditor({
  selectedBylaw,
  setSelectedBylaw,
  featuredContent,
  handleEditorChange,
  handleInputChange,
  handleSubmit,
  isPending: parentIsPending,
  isCheckboxChecked,
  setIsCheckboxChecked
}: AdminEditorProps) {
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
        <div className="p-2">
          <div className="space-y-4">
            {bylaws?.map(bylaw => (
              <UpdateBylawCard
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
        <FeaturedBylawEditor
          featuredContent={featuredContent}
          handleEditorChange={handleEditorChange}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isPending={parentIsPending}
          isCheckboxChecked={isCheckboxChecked}
          setIsCheckboxChecked={setIsCheckboxChecked}
        />
      )}
    </>
  );
}
