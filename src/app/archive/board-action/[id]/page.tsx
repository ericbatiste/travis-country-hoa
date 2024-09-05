import { getBoardActionById } from '@/utils/supabase/actions';
import { getAllBoardActionIds } from '@/utils/supabase/actions';
import { formatDate } from '@/utils/formatDate';
import { sanitizeHTML } from '@/utils/sanitizeHtml';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export async function generateStaticParams() {
  const actions = await getAllBoardActionIds();
  return actions ?? [];
}

export default async function BylawDetails({ params: { id } }: { params: { id: string } }) {
  const action = await getBoardActionById(id);

  if (!action) notFound();

  return (
    <div className="flex flex-col items-center justify-center max-h-max py-4">
      <section className="p-4 md:p-12 lg:p-20">
        <div>
          {action?.created_at && (
            <p className="text-gray-600 mb-4">Date uploaded: {formatDate(action.created_at)}</p>
          )}
          {action?.content && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Board Action:</h2>
              <div
                className="mt-2 text-gray-700 prose"
                dangerouslySetInnerHTML={{__html: sanitizeHTML(action.content)}}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}