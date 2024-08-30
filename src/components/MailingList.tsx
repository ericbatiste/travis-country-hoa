"use client"

import { useEffect, useState } from "react";
import { fetchMailingListSupa } from "@/utils/supabase/actions";

export default function MailingList() {
  const [subs, setSubs] = useState<any[]>([]);

  useEffect(() => {
    const getSubs = async () => {
      try {
        const subscribers = await fetchMailingListSupa();
        console.log(subscribers)
        setSubs(subscribers);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    getSubs();
    console.log(subs)
  }, []);

  return (
    <div className="my-10">
      <h1 className="text-xl font-bold mb-4 text-center">Mailing List</h1>
      {subs.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {subs.map((sub, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{sub.firstName} {sub.lastName}</span> - {sub.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
