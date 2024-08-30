'use client';

import { useState, useTransition, ChangeEvent } from 'react';
import Quill from './Quill';
import SubmitContentBtn from './SubmitContentBtn';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { sendAdminEmail } from '@/utils/apiCalls';

export default function Mailer() {
  const [isChecked, setIsChecked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState('monthly_close_up');
  const [emailData, setEmailData] = useState({
    subject: '',
    body: ''
  });

  const handleListSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setList(event?.target.value);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmailData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const handleEditorChange = (value: string) => {
    setEmailData(prev => ({
      ...prev,
      body: value
    }));
  };

  const validateContent = () => {
    if (!emailData.subject.trim() || !emailData.body.trim()) {
      throw new Error('All fields must be completed');
    }
  };

  const resetFields = () => {
    setEmailData({ subject: '', body: '' });
    setIsChecked(false);
  };

  const handleSendEmail = async () => {
    try {
      validateContent();
      startTransition(async () => {
        const { subject, body } = emailData;
        await sendAdminEmail(list, subject, body);
        toast.success('Email sent successfully!');
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      resetFields();
    }
  };

  return (
    <div className="flex flex-col w-4/5 my-10">
      <select 
          onChange={handleListSelect} 
          value={list} 
          className="mb-6 px-4 py-2 border rounded w-min self-center"
          >
          <option value="monthly_close_up">Draft Monthly Close Up</option>
          <option value="questionnaire">Draft Questionnaire</option>
        </select>

      <div className="flex flex-col gap-6">
        <div className="w-full">
          <label className="block text-lg font-bold mb-2">Subject:</label>
          <input
            type="text"
            placeholder="Enter email subject"
            value={emailData.subject}
            onChange={handleSubjectChange}
            className="w-full px-4 py-2 border rounded"
            />
        </div>

        <div className="w-full flex-grow">
          <h2 className="text-lg font-bold mb-2">Email Body:</h2>
          <Quill value={emailData.body} onChange={handleEditorChange} />
        </div>

        <div className="w-full">
          <SubmitContentBtn
            onClick={handleSendEmail}
            isPending={isPending}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            text="Send Email"
            />
        </div>
      </div>
    </div>
  );
}
