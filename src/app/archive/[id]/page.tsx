import { getBylawById } from '@/utils/supabase/actions';
import { getAllBylawIds } from '@/utils/supabase/actions';
import { formatDate } from '@/utils/formatDate';
import { sanitizeHTML } from '@/utils/sanitizeHtml';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export async function generateStaticParams() {
  const bylaws = await getAllBylawIds();
  return bylaws ?? [];
}

export default async function BylawDetails({ params: { id } }: { params: { id: string } }) {
  const bylaw = await getBylawById(id);

  if (!bylaw) notFound();

  return (
    <div className="flex flex-col items-center justify-center max-h-max py-4">
      <section className="p-4 md:p-12">
        <div className='space-y-8'>
          {bylaw?.section_number && (
            <p className="text-gray-600">Section Number: {bylaw.section_number}</p>
          )}
          {bylaw?.section_title && (
            <h1 className="text-3xl font-bold text-gray-800">{bylaw.section_title}</h1>
          )}
          {bylaw?.created_at && (
            <p className="text-gray-600">Date uploaded: {formatDate(bylaw.created_at)}</p>
          )}
          {bylaw?.bylaw_text && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Bylaw Text</h2>
              <div
                className="mt-2 text-gray-700 prose"
                dangerouslySetInnerHTML={{__html: sanitizeHTML(bylaw.bylaw_text)}}
              />
            </div>
          )}
          {bylaw?.in_a_nutshell && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">In a Nutshell</h2>
              <div
                className="mt-2 text-gray-700 prose"
                dangerouslySetInnerHTML={{__html: sanitizeHTML(bylaw.in_a_nutshell)}}
              />
            </div>
          )}
          {bylaw?.board_action && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Board Action</h2>
              <div
                className="mt-2 text-gray-700 prose"
                dangerouslySetInnerHTML={{__html: sanitizeHTML(bylaw.board_action)}}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
