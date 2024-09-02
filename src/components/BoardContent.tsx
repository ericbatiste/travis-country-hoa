import { getBoardObservations } from '@/utils/supabase/actions';
import { sanitizeHTML } from '@/utils/sanitizeHtml';

export const revalidate = 0;

export default async function BoardContent() {
  const boardObservation = await getBoardObservations();

  return (
    <>
      <h2 className="my-6 md:my-10 text-2xl md:text-5xl font-semibold text-blue text-center">
        Observations Re: Our Current Board 
      </h2>
      {boardObservation?.content && (
        <article className="p-4 md:p-14 bg-beige shadow-2xl">
          <div
            className="prose md:text-lg lg:text-xl text-gray-text"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(boardObservation.content) }}
          />
        </article>
      )}
    </>
  );
}
