"use client"

export default function SubscriberCard({ subscriber }: { subscriber: { name: string, address: string} }) {
  return (
    <div className="transition-all flex justify-around items-center min-w-min p-1 bg-beige rounded-sm shadow-lg border border-gray-warm">
      <h2 className="text-lg font-semibold text-gray-text whitespace-nowrap px-2">{subscriber.name}</h2>
      <p className="text-gray-text px-2">{subscriber.address}</p>
    </div>
  );
}
