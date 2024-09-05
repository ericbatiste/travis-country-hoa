'use client';

import { useState, useTransition, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { postNewBoardAction, updateBoardAction } from '@/utils/supabase/actions';
import Quill from './Quill';
import SubmitContentBtn from './SubmitContentBtn';
import { BoardActionEditorProps, BoardActionContentType } from '@/utils/types';

export default function BoardActionEditor({
  editingSection,
  selectedAction,
  setSelectedAction
}: BoardActionEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [boardContent, setBoardContent] = useState<BoardActionContentType>({
    description: '',
    content: ''
  });

  useEffect(() => {
    if (selectedAction) {
      setBoardContent({
        description: selectedAction.description,
        content: selectedAction.content
      });
    } else {
      resetFields();
    }
  }, [selectedAction]);

  const handleEditorChange = (content: string) => {
    setBoardContent(prev => ({ ...prev, content: content }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setBoardContent(prev => ({ ...prev, [name]: value }));
  };

  const validateContent = ({ description, content }: typeof boardContent) => {
    if (!description.trim() || !content.trim()) {
      throw new Error('Complete all fields to submit content.');
    }
  };

  const handleSubmit = () => {
    switch (editingSection) {
      case 'new action':
        postBoardContent();
        break;
      case 'update action':
        updateBoardContent();
        break;
    }
  };

  const resetFields = () => {
    setBoardContent({
      description: '',
      content: ''
    });
    setIsCheckboxChecked(false);
    setSelectedAction(null);
  };

  const postBoardContent = async () => {
    try {
      validateContent(boardContent);
      startTransition(async () => {
        const { description, content } = boardContent;
        const { errorMessage } = await postNewBoardAction(description, content);
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.success('Successfully posted new Board Action!');
          resetFields();
        }
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const updateBoardContent = async () => {
    if (!selectedAction) return;
    try {
      validateContent(boardContent);
      startTransition(async () => {
        const id = selectedAction.id;
        const { description, content } = boardContent;
        const { errorMessage } = await updateBoardAction(id, description, content);
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.success('Board Action updated successfully!');
          resetFields();
        }
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex flex-col gap-6 w-4/5">
      <div>
        <label className="block text-lg font-bold mb-2">Add brief description:</label>
        <textarea
          name="description"
          placeholder="Text for the archive description."
          value={boardContent.description}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="w-full flex-grow mb-6">
        <h2 className="text-lg font-bold mb-2">Board Action:</h2>
        <Quill value={boardContent.content} onChange={handleEditorChange} />
      </div>

      <SubmitContentBtn
        onClick={handleSubmit}
        isPending={isPending}
        isChecked={isCheckboxChecked}
        setIsChecked={setIsCheckboxChecked}
        text="Submit"
      />
    </div>
  );
}
