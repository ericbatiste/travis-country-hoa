'use client';

import { useEffect, useState } from 'react';
import { SubscribersType } from '@/utils/types';
import SubscriberCard from '@/components/SubscriberCard';

export default function MailingList({ subscribers }: { subscribers: SubscribersType }) {
  const [filter, setFilter] = useState<'all' | 'monthlyCloseUp' | 'questionnaire'>('all');
  const [filteredSubscribers, setFilteredSubscribers] = useState<any[]>([]);

  const { monthlyCloseUp, questionnaire } = subscribers;
  const allSubscribers = Array.from(
    new Map(
      [...monthlyCloseUp, ...questionnaire].map(subscriber => [subscriber.address, subscriber])
    ).values()
  );

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredSubscribers(allSubscribers);
        break;
      case 'monthlyCloseUp':
        setFilteredSubscribers(monthlyCloseUp);
        break;
      case 'questionnaire':
        setFilteredSubscribers(questionnaire);
        break;
      default:
        setFilteredSubscribers([]);
        break;
    }
  }, [filter]);

  return (
    <div className="flex flex-col gap-6 items-center my-10 w-3/4 mx-auto">
      <div>
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
      <h1 className="text-3xl font-bold text-center text-gray-text">Mailing List</h1>
      <div className="flex flex-col w-full space-y-2">
        {filteredSubscribers.map((sub, index) => (
          <SubscriberCard key={index} subscriber={sub} />
        ))}
      </div>
    </div>
  );
}
