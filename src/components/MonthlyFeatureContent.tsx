import { getFeaturedBylawContent } from '@/utils/supabase/actions';
import { sanitizeHTML } from '@/utils/sanitizeHtml';

export const revalidate = 0;

export default async function MonthlyFeatureContent() {
  const content = await getFeaturedBylawContent();

  return (
    <>
      <h2 className="my-6 md:my-10 text-2xl md:text-5xl font-semibold text-blue text-center">
        Monthly Featured TCCSA Bylaw
      </h2>
      <section className="px-6 md:px-20">
        <article className="bg-beige shadow-2xl max-w-4xl p-8 md:p-14">
          {content?.bylaw_text && (
            <div
              className="prose font-serif lext-lg md:text-xl"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.bylaw_text) }}
            />
          )}
        </article>
      </section>
    </>
  );
}
