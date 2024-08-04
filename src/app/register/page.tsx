'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { postUserRegistration } from '@/actions/apiCalls';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { RegFormType } from '@/actions/types';

export default function UserRegistration() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<RegFormType>({
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegSubmit = () => {
    startTransition(async () => {
      const { errorMessage } = await postUserRegistration(formData);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success('Registration Submitted!');
        setFormData({ firstName: '', lastName: '', email: '', address: '' });
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={e => {
          e.preventDefault();
          handleRegSubmit();
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">User Registration</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First name:
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last name:
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Submit Registration'}
        </button>
        <div className="mt-4 flex justify-center">
          <Link
            href={'./login'}
            className="text-indigo-500 hover:text-indigo-700 focus:outline-none focus:underline"
          >
            Return to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

