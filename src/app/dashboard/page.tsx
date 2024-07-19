"use client"

import PendingUsers from "@/components/PendingUsers"
import Editor from "@/components/Editor";
import { useState } from "react";

export default function AdminDashboard() {
  const [showPendingUsers, setShowPendingUsers] = useState(true);

  const toggleView = () => {
    setShowPendingUsers(!showPendingUsers);
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
        {showPendingUsers ? <PendingUsers /> : <Editor />}
      </div>
    </div>
  );
}