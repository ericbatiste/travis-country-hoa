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
      <h2 className="m-16 text-6xl font-semibold text-blue text-center">
        Our Monthly Featured TCCSA Bylaw
      </h2>
      <section className='px-20 mb-10'>
        <article
          className={`self-center bg-beige shadow-md max-w-3xl ${
            isNutshellVisible ? 'float-left p-8 mr-12 mb-8 w-2/5 cursor-pointer' : 'p-14'
          }`}
          onClick={isNutshellVisible ? toggleNutshell : undefined}
        >
          {featuredBylawContent?.bylaw_text && (
            <div
              className={`prose ${isNutshellVisible ? 'text-xs' : 'text-lg '}`}
              dangerouslySetInnerHTML={{__html: sanitizeHTML(featuredBylawContent.bylaw_text)}}
            />
          )}
        </article>

        {isNutshellVisible && (
          <article className='prose'>
            {featuredBylawContent?.in_a_nutshell && (
              <div>
                <h2 className="text-3xl font-semibold text-gray-text text-center">
                  In a Nutshell...
                </h2>
                <div
                  className="mt-2 mb-20 text-lg"
                  dangerouslySetInnerHTML={{__html: sanitizeHTML(featuredBylawContent.in_a_nutshell)}}
                />
              </div>
            )}
          </article>
        )}
      </section>

      {!isNutshellVisible && (
        <button className="mt-4 mb-20 text-2xl text-blue hover:underline hover:text-terracotta" onClick={toggleNutshell}>
          {isNutshellVisible ? 'Hide "In a Nutshell..."' : 'In a Nutshell...'}
        </button>
      )}
    </>
  );
}
