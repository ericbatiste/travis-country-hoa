'use client';

import { useState, FormEvent } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    monthlyNewsletter: false,
    questionnaires: false
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
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      monthlyNewsletter: false,
      questionnaires: false
    });
  };

  return (
    <>
      <div className="w-full px-8 md:px-20 my-10 md:my-20">
        <div className="mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-10 text-blue text-center">We are TSSCA members too…</h1>
          <p className="text-center text-xl md:text-2xl text-gray-text">
            And we would like to hear from you! Send us a message HERE or email us at{' '}
            <span className="font-bold text-blue italic">info.ourtraviscountry@gmail.com</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="md:px-10 space-y-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="monthlyNewsletter"
                  name="monthlyNewsletter"
                  checked={formData.monthlyNewsletter}
                  onChange={handleInputChange}
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
                  name="questionnaires"
                  checked={formData.questionnaires}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="questionnaires" className="ml-2 block text-sm text-gray-900">
                  Sign up to participate in important questionnaires and petitions
                </label>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="flex-grow mt-1 py-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-beige font-semibold bg-blue hover:bg-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
          >
            Send message
          </button>
        </form>
        <p className="mt-10 text-xl text-terracotta font-semibold text-center">
          We are consulting with a qualified HOA attorney to ensure the accuracy of our statements.
        </p>
      </div>
    </>
  );
}
