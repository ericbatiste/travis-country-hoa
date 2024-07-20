'use client';

import PendingUsers from '@/components/PendingUsers';
import Editor from '@/components/Editor';
import { useState, ChangeEvent } from 'react';

export default function AdminDashboard() {
  const [showPendingUsers, setShowPendingUsers] = useState(true);
  const [editingSection, setEditingSection] = useState('featured');

  const [featuredContent, setFeaturedContent] = useState({ monthly: '', nutshell: '' });
  const [boardContent, setBoardContent] = useState('');

  const toggleView = () => {
    setShowPendingUsers(!showPendingUsers);
  };

  const handleSectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEditingSection(event.target.value);
  };

  const handleEditorChange = (content: string, section: string) => {
    switch (section) {
      case 'featuredMonthly':
        setFeaturedContent(prev => ({ ...prev, monthly: content }));
        break;
      case 'inANutshell':
        setFeaturedContent(prev => ({ ...prev, nutshell: content }));
        break;
      case 'board':
        setBoardContent(content);
        break;
    }
  };

  const postFeaturedContent = async () => {
    // Post funtion here
  };

  const postBoardContent = async () => {
    // Post funtion here
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
              <option value="featured">Featured Monthly Section & In a Nutshell</option>
              <option value="board">Board Observations</option>
            </select>
            {editingSection === 'featured' ? (
              <div className="w-4/5 max-w-screen-lg mt-8">
                <div className="flex flex-col gap-20">
                  <div className="w-full">
                    <h2 className="text-xl font-bold mt-2 mb-2 text-center">
                      Featured Monthly Section
                    </h2>
                    <Editor onChange={content => handleEditorChange(content, 'featuredMonthly')} />
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl font-bold mt-2 mb-2 text-center">In a Nutshell</h2>
                    <Editor onChange={content => handleEditorChange(content, 'inANutshell')} />
                  </div>
                  <button
                    onClick={postFeaturedContent}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Post Featured & Nutshell Content
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-20 w-4/5 max-w-screen-lg mt-8">
                <div className="w-full">
                  <h2 className="text-xl font-bold mb-2 text-center">Board Observations</h2>
                  <Editor onChange={content => handleEditorChange(content, 'board')} />
                </div>
                <button
                  onClick={postBoardContent}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Post Board Observations
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
