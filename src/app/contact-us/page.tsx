'use client';

import { useState, FormEvent, useTransition } from 'react';
import { populateMailingLists, sendContactUsEmail } from '@/utils/apiCalls';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactUs() {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    monthlyCloseUp: false,
    questionnaire: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await sendContactUsEmail(formData);
        const { firstName, lastName, email } = formData;
        await populateMailingLists(firstName, lastName, email);
        
        toast.success('Your message has been sent!');
        resetFormFields();
      } catch (error) {
        console.error('Failed to send message:', error);
        toast.error('An error occurred while sending your message. Please try again later.');
      }
    })
  };

  const resetFormFields = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      monthlyCloseUp: false,
      questionnaire: false
    });
  };

  return (
    <>
      <div className="w-full px-8 md:px-20 my-10 md:my-20">
        <div className="mb-10 md:mb-20">
          <h1 className="text-2xl md:text-5xl font-bold mb-10 text-blue text-center">
            We are TSSCA members too…
          </h1>
          <p className="text-center text-lg md:text-2xl text-gray-text">
            And we would like to hear from you! Send us a message HERE or email us at{' '}
            <span className="font-bold text-blue italic">info@ourtraviscountry.com</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="md:px-10 space-y-10 md:space-y-16">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block font-medium text-gray-text">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-warm rounded-md shadow-sm focus:outline-blue focus:ring-blue focus:border-blue sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block font-medium text-gray-text">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-warm rounded-md shadow-sm focus:outline-blue focus:ring-blue focus:border-blue sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium text-gray-text">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-warm rounded-md shadow-sm focus:outline-blue focus:ring-blue focus:border-blue sm:text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="monthlyCloseUp"
                  name="monthlyCloseUp"
                  checked={formData.monthlyCloseUp}
                  onChange={handleInputChange}
                  className="cursor-pointer"
                />
                <label htmlFor="monthlyCloseUp" className="ml-2 text-gray-text cursor-pointer">
                  Sign up to receive a monthly close-up of our TCCSA
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="questionnaire"
                  name="questionnaire"
                  checked={formData.questionnaire}
                  onChange={handleInputChange}
                  className="cursor-pointer"
                />
                <label htmlFor="questionnaire" className="ml-2 text-gray-text cursor-pointer">
                  Sign up to participate in important questionnaires and petitions
                </label>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="message" className="block font-medium text-gray-text">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="flex-grow min-h-28 mt-1 p-2 border border-gray-warm rounded-md shadow-sm focus:outline-blue focus:ring-blue focus:border-blue sm:text-sm"
              />
            </div>
          </div>

          <button
            disabled={isPending}
            className="flex items-center justify-center w-full bg-blue text-white text-lg py-1 px-6 rounded-md hover:bg-green focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50"
            >
            {isPending ? <Loader2 className="animate-spin" /> : "Send Message"}
          </button>
        </form>

        <p className="mt-10 text-xl text-terracotta font-semibold text-center">
          We are consulting with a qualified HOA attorney to ensure the accuracy of our statements.
        </p>
      </div>
    </>
  );
}
