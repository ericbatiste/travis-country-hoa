'use client';

import { UserRegistrationCardProps } from '@/actions/types';

export default function UserRegistrationCard({
  user,
  onApprove,
  onReject,
  onResendCode
}: UserRegistrationCardProps) {
  return (
    <li className="py-4">
      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2">{user.address}</p>
        </div>
        <div className="flex space-x-4">
          {user.status === 'pending' && (
            <>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => onApprove(user.id)}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => onReject(user.id)}
              >
                Reject
              </button>
            </>
          )}
          {user.status === 'approved' && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => onResendCode(user.id)}
            >
              Re-send code
            </button>
          )}
          {user.status === 'rejected' && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => onApprove(user.id)}
            >
              Approve
            </button>
          )}
        </div>
      </div>
    </li>
  );
}


