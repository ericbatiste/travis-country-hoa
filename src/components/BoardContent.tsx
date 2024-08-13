import { getBoardObservations } from '@/actions/apiCalls';
import { sanitizeHTML } from '@/utils/sanitizeHtml';

export const revalidate = 0;

export default async function BoardContent() {
  const boardObservation = await getBoardObservations();

  return (
    <>
      <h2 className="m-16 text-6xl font-semibold text-blue text-center">
        Current Board Observations
      </h2>
      {boardObservation?.content && (
        <article className="p-16 mb-20 bg-beige shadow-md">
          <div
            className="prose text-gray-text"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(boardObservation.content) }}
          />
        </article>
      )}
    </>
  );
}
