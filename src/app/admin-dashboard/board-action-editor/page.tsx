'use client'

import AdminNav from "@/components/AdminNav"
import BoardActionEditor from "@/components/BoardActionEditor";
import UpdateBoardAction from "@/components/UpdateBoardAction";
import { useState, useEffect, ChangeEvent } from "react";
import { GetBoardActionsType } from "@/utils/types";

export default function BoardActionEditorPage() {
  const [editingSection, setEditingSection] = useState('new action');
  const [selectedAction, setSelectedAction] = useState<GetBoardActionsType | null>(null);

  useEffect(() => {
    setSelectedAction(null);
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
          <option value="new action">Post new Board Action</option>
          <option value="update action">Edit existing Board Action</option>
        </select>

        {editingSection === 'new action' && (
          <BoardActionEditor 
            editingSection={editingSection} 
            selectedAction={selectedAction} 
            setSelectedAction={setSelectedAction}
          />
        )}
        {editingSection === 'update action' && (
          <UpdateBoardAction
            editingSection={editingSection}
            selectedAction={selectedAction}
            setSelectedAction={setSelectedAction}
          />
        )}
      </div>
    </div>
  )
}