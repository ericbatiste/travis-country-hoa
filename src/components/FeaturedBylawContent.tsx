import { FeaturedBylawContentType } from '@/actions/types';
import { sanitizeHTML } from '@/utils/sanitizeHtml';

export default function FeaturedBylawContent({
  featuredBylawContent
}: {
  featuredBylawContent: FeaturedBylawContentType | null;
}) {

  return (
    <>
      <h2 className="my-6 md:my-10 text-2xl md:text-5xl font-semibold text-blue text-center">
        Monthly Featured TCCSA Bylaw
      </h2>
      <section className="px-6 md:px-20">
        <article className="self-center bg-beige shadow-2xl max-w-4xl text-lg p-8 md:p-14">
          {featuredBylawContent?.bylaw_text && (
            <div
              className="prose font-serif md:text-xl"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(featuredBylawContent.bylaw_text) }}
            />
          )}
        </article>
      </section>
    </>
  );
}
