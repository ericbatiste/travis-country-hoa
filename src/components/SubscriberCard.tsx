"use client"

export default function SubscriberCard({ subscriber }: { subscriber: { name: string, address: string} }) {
  return (
    <div className="transition-all flex justify-around items-center min-w-min p-2 bg-beige rounded-lg shadow-lg hover:shadow-xl border">
      <h2 className="text-lg font-semibold text-gray-text whitespace-nowrap px-2">{subscriber.name}</h2>
      <p className="text-gray-text px-2">{subscriber.address}</p>
    </div>
  );
}
