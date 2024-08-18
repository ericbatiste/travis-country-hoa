'use client';

import { useState } from 'react';
import { FeaturedBylawContentType } from '@/actions/types';
import { sanitizeHTML } from '@/utils/sanitizeHtml';

export default function FeaturedBylawContent({
  featuredBylawContent
}: {
  featuredBylawContent: FeaturedBylawContentType | null;
}) {
  const [isNutshellVisible, setIsNutshellVisible] = useState(false);

  const toggleNutshell = () => {
    setIsNutshellVisible(!isNutshellVisible);
  };

  return (
    <>
      <h2 className="m-8 md:m-16 text-4xl md:text-6xl font-semibold text-blue text-center">
        Our Monthly Featured TCCSA Bylaw
      </h2>
      <section className="px-6 md:px-20 mb-10">
        <article
          className={`self-center bg-beige shadow-md max-w-4xl text-lg ${
            isNutshellVisible
              ? 'transition-shadow lg:float-left p-8 lg:mr-12 mb-8 lg:w-2/5 cursor-pointer hover:shadow-xl'
              : 'p-8 md:p-14 mb-10'
          }`}
          onClick={isNutshellVisible ? toggleNutshell : undefined}
        >
          {featuredBylawContent?.bylaw_text && (
            <div
              className={`prose font-serif ${isNutshellVisible ? 'text-xs' : 'md:text-xl '}`}
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(featuredBylawContent.bylaw_text) }}
            />
          )}
        </article>

        {isNutshellVisible && (
          <article className="prose">
            {featuredBylawContent?.in_a_nutshell && (
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-text text-center">
                  In a Nutshell...
                </h2>
                <div
                  className="mt-2 md:text-lg"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(featuredBylawContent.in_a_nutshell)
                  }}
                />
              </div>
            )}
          </article>
        )}
      </section>

      <button
        className="transition-all mb-20 px-6 py-4 bg-terracotta rounded-md shadow-md text-2xl text-beige font-bold hover:shadow-lg hover:bg-green"
        onClick={toggleNutshell}
      >
        {isNutshellVisible ? 'Back' : 'In a Nutshell...'}
      </button>
    </>
  );
}
