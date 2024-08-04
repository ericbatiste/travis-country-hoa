import { getBoardObservations } from "@/actions/apiCalls";
import { sanitizeHTML } from "@/utils/sanitizeHtml";

export const revalidate = 0;

export default async function BoardContent() {
  const boardObservation = await getBoardObservations();

  return (
    <section>
          {boardObservation?.content && (
            <article className="p-10 m-20 bg-gray-100 rounded-lg shadow-md">
              <h2 className="mb-6 text-xl font-semibold text-gray-800 text-center">
                Current Board Observations
              </h2>
              <div 
                className="mt-2 text-gray-700 prose" 
                dangerouslySetInnerHTML={sanitizeHTML(boardObservation.content)}
              />
            </article>
          )}
    </section>
  );
}
