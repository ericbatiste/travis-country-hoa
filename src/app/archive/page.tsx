"use client"

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getAllBylaws } from "@/actions/apiCalls";
import { AllBylawsType } from "@/actions/types";
import { Loader2 } from "lucide-react";

export default function Archive() {
  const [isPending, startTransition] = useTransition();
  const [bylaws, setBylaws] = useState<AllBylawsType[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    startTransition(async () => {
      const result = await getAllBylaws();
      setBylaws(result);
    });
  }, []);

  const handleCardClick = (section_number: string) => {
    startTransition(() => {
      router.push(`/archive/${section_number}`);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Archived Bylaws</h1>
      <div className="space-y-4">
        {isPending ? (
          <Loader2 className="animate-spin"/>
        ) : (
          bylaws ? (
            bylaws.map((bylaw) => (
              <div
                key={bylaw.section_number}
                className="border p-4 rounded cursor-pointer hover:shadow-lg"
                onClick={() => handleCardClick(bylaw.section_number || '')}
              >
                <h2 className="text-xl font-semibold">Section: {bylaw.section_number}</h2>
                <p className="text-lg text-gray-600 font-semibold">{bylaw.section_title}</p>
              </div>
            ))
          ) : (
            <p>No bylaws found.</p>
          )
        )}
      </div>
    </div>
  );
}