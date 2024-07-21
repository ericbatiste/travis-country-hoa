"use client"

import { useState, useEffect, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { getBoardObservations } from "@/actions/apiCalls";
import DOMPurify from 'dompurify';
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/errorMsg";
import { BoardObservationsContentType } from "@/actions/types";

export default function BoardContent() {
  const [isPending, startTransition] = useTransition();
  const [boardObservation, setBoardObservation] = useState<BoardObservationsContentType | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await getBoardObservations();
        setBoardObservation(data);
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
          {boardObservation?.content && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Current Board Observations</h2>
              <p 
                className="mt-2 text-gray-700 prose" 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(boardObservation.content) }}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
