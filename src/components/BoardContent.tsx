import { getBoardObservations } from "@/actions/apiCalls";
import { sanitizeHTML } from "@/utils/sanitizeHtml";

export default async function BoardContent() {
  const boardObservation = await getBoardObservations();

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
          {boardObservation?.content && (
            <article>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Current Board Observations</h2>
              <div 
                className="mt-2 text-gray-700 prose" 
                dangerouslySetInnerHTML={sanitizeHTML(boardObservation.content)}
              />
            </article>
          )}
    </section>
  );
}
