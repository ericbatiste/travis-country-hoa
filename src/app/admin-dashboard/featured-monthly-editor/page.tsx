'use client';

import AdminNav from '@/components/AdminNav';
import { useState, useEffect, ChangeEvent } from 'react';
import { GetBylawsType } from '@/utils/types';
import FeaturedMonthlyEditor from '@/components/FeaturedMonthlyEditor';
import UpdateFeaturedMothly from '@/components/UpdateFeaturedMonthly';

export default function FeaturedMonthlyEditorPage() {
  const [editingSection, setEditingSection] = useState('new bylaw');
  const [selectedBylaw, setSelectedBylaw] = useState<GetBylawsType | null>(null);

  useEffect(() => {
    setSelectedBylaw(null);
  }, [editingSection, setEditingSection]);

  const handleSectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditingSection(e.target.value);
  };

  return (
    <div className="flex w-screen">
      <aside className="top-0 left-0 h-screen w-min p-4">
        <AdminNav />
      </aside>
      <div className="flex flex-col flex-grow items-center my-10">
        <select
          onChange={handleSectionChange}
          value={editingSection}
          className="mb-6 px-4 py-2 border rounded w-min self-center"
        >
          <option value="new bylaw">Post new featured bylaw</option>
          <option value="update bylaw">Edit existing bylaw</option>
        </select>

        {editingSection === 'new bylaw' && (
          <FeaturedMonthlyEditor 
            editingSection={editingSection} 
            selectedBylaw={selectedBylaw} 
            setSelectedBylaw={setSelectedBylaw}
          />
        )}
        {editingSection === 'update bylaw' && (
          <UpdateFeaturedMothly
            editingSection={editingSection}
            selectedBylaw={selectedBylaw}
            setSelectedBylaw={setSelectedBylaw}
          />
        )}
      </div>
    </div>
  );
}
