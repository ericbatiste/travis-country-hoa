'use client';

import ContentEditor from '@/components/ContentEditor';
import { useState, ChangeEvent } from 'react';

export default function AdminDashboard() {
  const [editingSection, setEditingSection] = useState('new bylaw');

  const handleSectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEditingSection(event.target.value);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <select
          onChange={handleSectionChange}
          value={editingSection}
          className="mb-2 px-4 py-2 border rounded"
        >
          <option value="new bylaw">Post new featured bylaw</option>
          <option value="update bylaw">Edit existing bylaw</option>
          <option value="board">Update Board Observations</option>
        </select>
        <ContentEditor editingSection={editingSection} />
      </div>
    </div>
  );
}
