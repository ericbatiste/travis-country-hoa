'use client';

// import testUsers from '@/app/admin-dashboard/testUsersData';
import { useEffect, useState } from 'react';
import UserRegistrationCard from './UserRegistrationCard';
import { approveUserAction } from '@/actions/users';
import { getPublicUsers, updateUserStatus } from '@/actions/apiCalls';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { UserType } from '@/actions/types';

export default function UserRegistrations() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getPublicUsers();
      if (data) {
        setUsers(data);
      }
    };

    getUsers();
  }, []);

  // useEffect(() => {
  //   setUsers(testUsers);
  // }, []);

  const filteredUsers =
    statusFilter === 'all' ? users : users.filter(user => user.status === statusFilter);

  const handleUserApproval = async (email: string) => {
    try {
      const { errorMessage: approvalError } = await approveUserAction(email);
      if (approvalError) {
        throw new Error(approvalError);
      }

      const { errorMessage: updateError } = await updateUserStatus(email, 'approved');
      if (updateError) {
        throw new Error(updateError);
      }

      toast.success('User Approved, OTP code successfully sent!');
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  const handleUserResend = async (email: string) => {
    const { errorMessage } = await approveUserAction(email);
    if (!errorMessage) {
      toast.success('User Approved, OTP code successfully sent!');
    } else {
      toast.error(errorMessage);
    }
  };

  const handleUserRejection = async (email: string) => {
    const { errorMessage } = await updateUserStatus(email, 'rejected');
    if (!errorMessage) {
      // send notification email here.
      toast.success('User status updated to rejected.');
    } else {
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Registrations</h1>

      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="verified">Verified</option>
          <option value="rejected">Rejected</option>
          <option value="all">All</option>
        </select>
      </div>

      <ul>
        {filteredUsers.map(user => (
          <UserRegistrationCard
            key={user.id}
            user={user}
            onApprove={() => {
              handleUserApproval(user.email);
            }}
            onResendCode={() => {
              handleUserResend(user.email);
            }}
            onReject={() => {
              handleUserRejection(user.email);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
