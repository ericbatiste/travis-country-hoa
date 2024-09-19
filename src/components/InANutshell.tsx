"use client"

import { useRouter } from 'next/navigation';
import { FeaturedBylawContentType } from '@/utils/types';
import { sanitizeHTML } from '@/utils/sanitizeHtml';

export default function InANutshell({
  featuredBylawContent
}: {
  featuredBylawContent: FeaturedBylawContentType | null;
}) {
  const router = useRouter();

  return (
    <>
      <h2 className="my-4 md:my-8 text-2xl md:text-5xl font-semibold text-blue text-center">
        In A Nutshell
      </h2>
      <section className="px-4 md:px-10 lg:px-[10rem] lg:min-w-[1300px]">
        <article 
          className="self-center bg-beige shadow-2xl text-lg transition-shadow lg:float-left p-8 lg:mr-12 mb-4 mt-2 lg:w-2/5 cursor-pointer hover:shadow-xl"
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
          {featuredBylawContent?.in_a_nutshell && (
            <div>
              <div
                className="md:text-xl"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(featuredBylawContent.in_a_nutshell),
                }}
              />
            </div>
          )}
        </article>
        <p className="my-6 text-lg md:text-2xl text-terracotta font-semibold text-center">
          * We are consulting with a qualified HOA attorney to ensure the accuracy of our statements. *
        </p>
      </section>
    </>
  );
}