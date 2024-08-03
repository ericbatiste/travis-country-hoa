import { FeaturedBylawContentType } from '@/actions/types';
import { sanitizeHTML } from '@/utils/sanitizeHtml';

export default function FeaturedBylawContent({
  featuredBylawContent
}: {
  featuredBylawContent: FeaturedBylawContentType | null
}) {

  return (
    <section className="flex flex-col space-y-20">
      <article className="p-10 bg-gray-100 rounded-lg shadow-md">
        {featuredBylawContent?.bylaw_text && (
          <div className="mb-4">
            <h2 className="mb-6 text-xl font-semibold text-gray-800 text-center">
              Monthly Featured Bylaw
            </h2>
            <article
              className="mt-2 text-gray-700 prose"
              dangerouslySetInnerHTML={sanitizeHTML(featuredBylawContent.bylaw_text)}
            />
          </div>
        )}
      </article>
      <article className="p-10 bg-gray-100 rounded-lg shadow-md">
        {featuredBylawContent?.in_a_nutshell && (
          <div>
            <h2 className="mb-6 text-xl font-semibold text-gray-800 text-center">
              In a Nutshell...
            </h2>
            <article
              className="mt-2 text-gray-700 prose"
              dangerouslySetInnerHTML={sanitizeHTML(featuredBylawContent.in_a_nutshell)}
            />
          </div>
        )}
      </article>
    </section>
  );
}
