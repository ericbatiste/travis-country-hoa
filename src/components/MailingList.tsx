'use client';

import { useState } from 'react';
import { SubscriberType } from '@/utils/types';
import SubscriberCard from '@/components/SubscriberCard';

export default function MailingList({ subscribers }: { subscribers: SubscriberType[] }) {
  const [filter, setFilter] = useState<'all' | 'monthlyCloseUp' | 'questionnaire'>('all');

  const filteredSubscribers = subscribers.filter(subs => {
    if (filter === 'monthlyCloseUp') return subs.monthlyCloseUp;
    if (filter === 'questionnaire') return subs.questionnaire;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 items-center my-10 w-3/4 mx-auto">
      <div className="">
        <select
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value as 'all' | 'monthlyCloseUp' | 'questionnaire')}
          className="border rounded p-2"
        >
          <option value="all">All Subscribers</option>
          <option value="monthlyCloseUp">Monthly Close-Up</option>
          <option value="questionnaire">Questionnaire</option>
        </select>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800">Mailing List</h1>
      <div className="flex flex-col w-full">
        {filteredSubscribers.map((sub, index) => (
          <SubscriberCard key={index} subscriber={sub} />
        ))}
      </div>
    </div>
  );
}
