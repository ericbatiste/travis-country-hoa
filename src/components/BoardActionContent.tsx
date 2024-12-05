'use client';

import { useRouter } from 'next/navigation';
import { sanitizeHTML } from '@/utils/sanitizeHtml';
import { FeaturedBylawContentType } from '@/utils/types';

export default function BoardActionContent({
  content
}: {
  content: FeaturedBylawContentType | null;
}) {
  const router = useRouter();

  return (
    <>
      <h2 className="my-4 md:my-8 text-2xl md:text-5xl font-semibold text-blue text-center">
        Observations Re: Our Current Board
      </h2>
      <section className="px-4 md:px-10 lg:px-[10rem] lg:min-w-[1300px]">
        <article
          className="self-center bg-beige shadow-2xl text-lg transition-shadow lg:float-left p-8 lg:mr-12 mb-8 mt-2 lg:w-2/5 cursor-pointer hover:shadow-xl hidden lg:block"
          onClick={() => router.push('./monthly-feature')}
        >
          {content?.bylaw_text && (
            <div
              className="prose font-serif text-xs"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(content.bylaw_text) }}
            />
          )}
        </article>

        <article className="prose">
          {content?.board_action && (
            <div>
              <div
                className="md:text-xl"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(content.board_action)
                }}
              />
            </div>
          )}
        </article>

        <article className="flex flex-col gap-4">
          <p className="text-lg md:text-2xl text-terracotta font-semibold text-center">
            * We are consulting with a qualified HOA attorney to ensure the accuracy of our
            statements. *
          </p>
          <p className="md:text-xl text-terracotta font-semibold text-center">
            The observations above represent our understanding of this Board action and why the
            action appears to be inconsistent with our governing documents.
          </p>
        </article>
      </section>
    </>
  );
}
