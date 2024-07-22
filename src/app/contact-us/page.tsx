'use client';

import { useState, FormEvent } from 'react';

export default function ContactUs() {
  const [message, setMessage] = useState<string>('');
  const [monthlyNewsletter, setMonthlyNewsletter] = useState<boolean>(false);
  const [questionnaires, setQuestionnaires] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    resetFormFields();
  };

  const resetFormFields = () => {
    setMessage('');
    setMonthlyNewsletter(false);
    setQuestionnaires(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">We are TSSCA members too…</h1>
        <h2 className="text-xl mb-6 text-center">
          We are consulting with a qualified HOA attorney to ensure the accuracy of our statements.
        </h2>
        <p className="mb-6 text-center text-gray-700">
          We would like to hear from you, send us a message here or email us at{' '}
          <span className="font-bold italic">info.ourhoa@gmail.com</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="monthlyNewsletter"
              checked={monthlyNewsletter}
              onChange={e => setMonthlyNewsletter(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="monthlyNewsletter" className="ml-2 block text-sm text-gray-900">
              Sign up to receive a monthly close-up of our TCCSA
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="questionnaires"
              checked={questionnaires}
              onChange={e => setQuestionnaires(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="questionnaires" className="ml-2 block text-sm text-gray-900">
              Sign up to participate in important questionnaires and petitions
            </label>
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
