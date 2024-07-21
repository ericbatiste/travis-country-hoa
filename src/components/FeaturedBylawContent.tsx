"use client"

import { getFeaturedBylawContent } from "@/actions/apiCalls";
import { useState, useEffect, useTransition } from "react";
import { Loader2 } from "lucide-react";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/errorMsg";
import { FeaturedBylawContentType } from "@/actions/types";

export default function FeaturedBylawContent() {
  const [isPending, startTransition] = useTransition();
  const [featuredBylawContent, setFeaturedBylawContent] = useState<FeaturedBylawContentType | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await getFeaturedBylawContent();
        setFeaturedBylawContent(data);
      } catch (error) {
        toast.error(getErrorMessage(error))
        console.error("Failed to fetch data:", error);
      }
    });
  }, []);

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      {isPending ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : (
        <div>
          {featuredBylawContent?.bylaw_text && (
            <div className="mb-4">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">This Month's Featured Bylaw</h2>
              <p 
                className="mt-2 text-gray-700 prose" 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(featuredBylawContent.bylaw_text) }}
              />
            </div>
          )}
          {featuredBylawContent?.in_a_nutshell && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">In a Nutshell...</h2>
              <p 
                className="mt-2 text-gray-700 prose" 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(featuredBylawContent.in_a_nutshell) }}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

