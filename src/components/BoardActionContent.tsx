'use client'

import { useRouter } from 'next/navigation';
import { sanitizeHTML } from '@/utils/sanitizeHtml';
import { BoardObservationsContentType, FeaturedBylawContentType, GetBylawsType } from '@/utils/types';

export default async function BoardActionContent({
  featuredBylawContent,
  boardAction
}: {
  featuredBylawContent: FeaturedBylawContentType | null;
  boardAction: BoardObservationsContentType | null;
}) {
  const router = useRouter();

  return (
    <>
      <h2 className="my-6 md:my-10 text-2xl md:text-5xl font-semibold text-blue text-center">
        Observations Re: Our Current Board
      </h2>
      <section className="px-4 md:px-10 lg:px-[10rem] lg:min-w-[1300px]">
        <article
          className="self-center bg-beige shadow-2xl text-lg transition-shadow lg:float-left p-8 lg:mr-12 mb-8 lg:w-2/5 cursor-pointer hover:shadow-xl"
          onClick={() => router.push('./')}
        >
          {featuredBylawContent?.bylaw_text && (
            <div
              className="prose font-serif text-xs"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(featuredBylawContent.bylaw_text) }}
            />
          )}
        </article>

        <article className="prose">
          {boardAction?.content && (
            <div>
              <div
                className="mt-2 md:text-xl"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(boardAction.content)
                }}
              />
            </div>
          )}
        </article>
        <p className="mt-10 text-lg md:text-2xl text-terracotta font-semibold text-center">
          We are consulting with a qualified HOA attorney to ensure the accuracy of our statements.
        </p>
      </section>
    </>
  );
}
