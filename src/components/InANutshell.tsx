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
      <h2 className="my-6 md:my-10 text-2xl md:text-5xl font-semibold text-blue text-center">
        In A Nutshell
      </h2>
      <section className="px-6 md:px-14 lg:px-[12rem] lg:min-w-[1200px]">
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
          {featuredBylawContent?.in_a_nutshell && (
            <div>
              <div
                className="mt-2 md:text-lg"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(featuredBylawContent.in_a_nutshell),
                }}
              />
            </div>
          )}
        </article>
      </section>
    </>
  );
}