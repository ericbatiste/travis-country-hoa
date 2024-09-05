'use client';

import { useState, useTransition, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { postNewBoardAction, updateBoardAction } from '@/utils/supabase/actions';
import Quill from './Quill';
import SubmitContentBtn from './SubmitContentBtn';
import { BoardActionEditorProps } from '@/utils/types';

export default function BoardActionEditor({
  editingSection,
  selectedAction,
  setSelectedAction
}: BoardActionEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [boardContent, setBoardContent] = useState('');

  useEffect(() => {
    if (selectedAction) {
      setBoardContent(selectedAction.content);
    } else {
      resetFields();
    }
  }, [selectedAction]);

  const handleEditorChange = (content: string) => {
    setBoardContent(content)
  }

  const validateContent = (content: string) => {
    if (!content.trim()) {
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
    setBoardContent('');
    setIsCheckboxChecked(false);
    setSelectedAction(null);
  };

  const postBoardContent = async () => {
    try {
      validateContent(boardContent);
      startTransition(async () => {
        const { errorMessage } = await postNewBoardAction(boardContent)
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
        const id = selectedAction.id
        const { errorMessage } = await updateBoardAction(id, boardContent);
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
    <div className="flex flex-col w-4/5">
      <div className="w-full flex-grow mb-6">
        <h2 className="text-lg font-bold mb-2">Board Action:</h2>
        <Quill
          value={boardContent}
          onChange={handleEditorChange}
        />
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
