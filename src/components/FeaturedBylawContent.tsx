import { sanitizeHTML } from "@/utils/sanitizeHtml";
import { getFeaturedBylawContent } from "@/actions/apiCalls";

export default async function FeaturedBylawContent() {
  const featuredBylawContent = await getFeaturedBylawContent();

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div>
        {featuredBylawContent?.bylaw_text && (
          <div className="mb-4">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              This Month's Featured Bylaw
            </h2>
            <article
              className="mt-2 text-gray-700 prose"
              dangerouslySetInnerHTML={sanitizeHTML(featuredBylawContent.bylaw_text)}
            />
          </div>
        )}
        {featuredBylawContent?.in_a_nutshell && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              In a Nutshell...
            </h2>
            <article
              className="mt-2 text-gray-700 prose"
              dangerouslySetInnerHTML={sanitizeHTML(featuredBylawContent.in_a_nutshell)}
            />
          </div>
        )}
      </div>
    </section>
  );
}