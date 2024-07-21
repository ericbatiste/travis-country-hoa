'use client';

import PendingUsers from '@/components/PendingUsers';
import ContentEditor from '@/components/ContentEditor';
import { useState, ChangeEvent } from 'react';

export default function AdminDashboard() {
  const [showPendingUsers, setShowPendingUsers] = useState(true);
  const [editingSection, setEditingSection] = useState('bylaw');

  const toggleView = () => {
    setShowPendingUsers(!showPendingUsers);
  };

  const handleSectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEditingSection(event.target.value);
  };

  return (
    <div className="p-6">
      <button
        onClick={toggleView}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showPendingUsers ? 'Show Editor' : 'Show Pending Users'}
      </button>
      <div className="mt-4">
        {showPendingUsers ? (
          <PendingUsers />
        ) : (
          <div className="flex flex-col items-center">
            <select
              onChange={handleSectionChange}
              value={editingSection}
              className="mb-2 px-4 py-2 border rounded"
            >
              <option value="bylaw">Featured Bylaw & In a Nutshell</option>
              <option value="board">Board Observations</option>
            </select>
            <ContentEditor editingSection={editingSection} />
          </div>
        )}
      </div>
    </div>
  );
}

