"use client"

import { SubscriberType } from "@/utils/types";

export default function SubscriberCard({ subscriber }: { subscriber: SubscriberType }) {
  return (
    <div className="transition-all flex justify-around items-center p-2 bg-beige rounded-lg shadow-lg hover:shadow-xl border">
      <h2 className="text-lg font-semibold text-gray-text">{subscriber.firstName} {subscriber.lastName}</h2>
      <p className="text-gray-text">{subscriber.email}</p>
    </div>
  );
}
