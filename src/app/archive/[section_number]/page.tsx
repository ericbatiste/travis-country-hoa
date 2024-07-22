"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { getAllBylaws } from "@/actions/apiCalls";
import { AllBylawsType } from "@/actions/types";
import { getErrorMessage } from "@/utils/errorMsg";
import { formatDate } from "@/utils/formatDate";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

export default function BylawDetails() {
  const [isPending, startTransition] = useTransition();
  const [bylaw, setBylaw] = useState<AllBylawsType | null>(null);
  const { section_number } = useParams<{ section_number?: string }>();

  useEffect(() => {
    if (section_number) {
      startTransition(async () => {
        try {
          const bylaws = await getAllBylaws();
          const selectedBylaw = bylaws?.find(bylaw => bylaw.section_number === section_number);
          setBylaw(selectedBylaw || null);
        } catch (error) {
          toast.error(getErrorMessage(error));
        }
      });
    }
  }, [section_number]);

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      {isPending ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : bylaw ? (
        <div>
          {bylaw.section_number && (
            <p className="text-gray-600 mb-2">Section Number: {bylaw.section_number}</p>
          )}
          {bylaw.section_title && (
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{bylaw.section_title}</h1>
          )}
          {bylaw.created_at && (
            <p className="text-gray-600 mb-4">Date uploaded: {formatDate(bylaw.created_at)}</p>
          )}
          {bylaw.bylaw_text && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Bylaw Text</h2>
              <p 
                className="mt-2 text-gray-700 prose" 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bylaw.bylaw_text) }}
              />
            </div>
          )}
          {bylaw.in_a_nutshell && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">In a Nutshell...</h2>
              <p 
                className="mt-2 text-gray-700 prose" 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bylaw.in_a_nutshell) }}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-700">Bylaw not found.</p>
      )}
    </section>
  );
}

