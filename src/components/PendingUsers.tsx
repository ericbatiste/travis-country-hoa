'use client';

import { useEffect, useState } from 'react';
import { approveUserAction } from '@/actions/users';
import { getPendingUsers, updateUserStatus } from '@/actions/apiCalls';

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  status: string;
};

export default function PendingUsers() {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getPendingUsers();
      if (data) {
        setPendingUsers(data);
      }
    };

    getUsers();
  }, []);

  const handleUserApproval = async (email: string) => {
    const { errorMessage } = await approveUserAction(email);
    if (!errorMessage) { 
        updateUserStatus(email, 'approved');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Registrations</h1>
      <ul className="divide-y divide-gray-200">
        {pendingUsers.map(user => (
          <li key={user.id} className="py-4">
            <p className="text-lg font-semibold">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2">{user.address}</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleUserApproval(user.email)}
              >
                Approve
              </button>
              <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
