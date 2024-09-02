'use client';

import { useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { unsubscribeUser } from '@/utils/apiCalls';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { extractEmail } from '@/utils/extractEmail';

export default function Unsubscribe() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const recipient = searchParams.get('email');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const monthlyCloseUp = formData.get('monthlyCloseUp') === 'on';
    const questionnaire = formData.get('questionnaire') === 'on';
    const email = extractEmail(recipient!);

    if (!monthlyCloseUp && !questionnaire) {
      toast.error('You must select at least one list to unsubscribe');
      return;
    }

    startTransition(async () => {
      console.log(email)
      const success = await unsubscribeUser(email!, monthlyCloseUp, questionnaire);
      
      if (success) {
        toast.success('Successfully unsubscribed from selected lists.');
        router.push('/')
      } else {
        toast.error('Failed to unsubscribe.');
      }
    });
  };

  return (
    <div className="max-h-screen flex justify-center mt-20">
      <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-md shadow-md bg-beige w-max">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Unsubscribe for {recipient}</h2>
          <p className="text-gray-text text-lg font-semibold">
            Which lists would you like to unsubscribe from?
          </p>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center self-start">
              <input
                type="checkbox"
                id="monthlyCloseUp"
                name="monthlyCloseUp"
                className="cursor-pointer"
              />
              <label htmlFor="monthlyCloseUp" className="ml-2 text-gray-text text-lg cursor-pointer">
                Monthly Close-ups
              </label>
            </div>

            <div className="flex items-center self-start">
              <input
                type="checkbox"
                id="questionnaire"
                name="questionnaire"
                className="cursor-pointer"
              />
              <label htmlFor="questionnaire" className="ml-2 text-gray-text text-lg cursor-pointer">
                Questionnaires
              </label>
            </div>
          </div>
          <button
            disabled={isPending}
            className="bg-blue text-white text-lg py-1 px-6 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50"
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Unsubscribe'}
          </button>
        </form>
      </div>
    </div>
  );
}
