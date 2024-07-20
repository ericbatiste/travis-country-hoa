'use client';

import PendingUsers from '@/components/PendingUsers';
import Editor from '@/components/Editor';
import { useState, ChangeEvent } from 'react';
import { getErrorMessage } from '@/utils/errorMsg';
import toast from 'react-hot-toast';

type FeaturedContent = {
  sectionNumber: string;
  sectionTitle: string;
  bylawText: string;
  inANutshell: string;
};

export default function AdminDashboard() {
  const [showPendingUsers, setShowPendingUsers] = useState(true);
  const [editingSection, setEditingSection] = useState('bylaw');

  const [featuredContent, setFeaturedContent] = useState<FeaturedContent>({
    sectionNumber: '',
    sectionTitle: '',
    bylawText: '',
    inANutshell: ''
  });
  const [boardContent, setBoardContent] = useState('');

  const toggleView = () => {
    setShowPendingUsers(!showPendingUsers);
  };

  const handleSectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEditingSection(event.target.value);
  };

  const handleEditorChange = (content: string, section: string) => {
    switch (section) {
      case 'featuredBylaw':
        setFeaturedContent(prev => ({ ...prev, bylaw: content }));
        break;
      case 'inANutshell':
        setFeaturedContent(prev => ({ ...prev, nutshell: content }));
        break;
      case 'boardObservations':
        setBoardContent(content);
        break;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFeaturedContent(prev => ({ ...prev, [name]: value }));
  };

  const validateContent = (content: FeaturedContent | string) => {
    if (typeof content === 'string') {
      if (!content.trim()) {
        throw new Error('Please fill in the Board Observations content.');
      }
    } else {
      for (const key in content) {
        if (!content[key as keyof FeaturedContent].trim()) {
          throw new Error(`Please fill in all fields for Featured Bylaw & In a Nutshell.`);
        }
      }
    }
  };

  const postFeaturedContent = async () => {
    try {
      validateContent(featuredContent);
      // Post function here
      console.log(featuredContent);
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
    }
  };

  const postBoardContent = async () => {
    try {
      validateContent(boardContent);
      // Post function here
      console.log(boardContent);
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage)
    }
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
            {editingSection === 'bylaw' ? (
              <div className="flex flex-col w-4/5 max-w-screen-lg mt-8">
                <div className="flex justify-between gap-4 w-full">

                  <div className="w-1/2">
                    <label className="block text-lg font-bold mb-2">Section Number:</label>
                    <input
                      type="text"
                      name="number"
                      placeholder='Bylaw section number (not displayed).'
                      value={featuredContent.sectionNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-lg font-bold mb-2">Section Title:</label>
                    <input
                      type="text"
                      name="title"
                      placeholder='Bylaw section title (not displayed).'
                      value={featuredContent.sectionTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div className="w-full flex-grow mt-4 mb-4">
                  <h2 className="text-lg font-bold mt-2 mb-2">Bylaw Text:</h2>
                  <Editor onChange={content => handleEditorChange(content, 'featuredBylaw')} />
                </div>

                <div className="w-full flex-grow mt-10 mb-4">
                  <h2 className="text-lg font-bold mt-2 mb-2">In a Nutshell:</h2>
                  <Editor onChange={content => handleEditorChange(content, 'inANutshell')} />
                </div>

                <button
                  onClick={postFeaturedContent}
                  className="mt-14 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Post Featured & Nutshell Content
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-4/5 max-w-screen-lg mt-8">
                <div className="w-full flex-grow mb-10">
                  <h2 className="text-lg font-bold mb-2">Board Observations:</h2>
                  <Editor onChange={content => handleEditorChange(content, 'boardObservations')} />
                </div>
                <button
                  onClick={postBoardContent}
                  className="mt-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
