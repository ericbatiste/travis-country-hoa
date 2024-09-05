'use client';

import { useState, useTransition, ChangeEvent, useEffect } from 'react';
import Quill from './Quill';
import SubmitContentBtn from './SubmitContentBtn';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { postNewFeaturedBylaw, updateBylaw } from '@/utils/supabase/actions';
import { PostNewFeaturedBylawType, FeaturedMonthlyEditorProps } from '@/utils/types';

export default function FeaturedMonthlyEditor({
  editingSection,
  selectedBylaw,
  setSelectedBylaw
}: FeaturedMonthlyEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [featuredContent, setFeaturedContent] = useState<PostNewFeaturedBylawType>({
    sectionNumber: '',
    sectionTitle: '',
    description: '',
    bylawText: '',
    inANutshell: ''
  });

  useEffect(() => {
    if (selectedBylaw) {
      setFeaturedContent({
        sectionNumber: selectedBylaw.section_number,
        sectionTitle: selectedBylaw.section_title,
        description: selectedBylaw.description,
        bylawText: selectedBylaw.bylaw_text,
        inANutshell: selectedBylaw.in_a_nutshell
      });
    } else {
      resetFields();
    }
  }, [selectedBylaw]);

  const handleEditorChange = (content: string, section: string) => {
    switch (section) {
      case 'featuredBylaw':
        setFeaturedContent(prev => ({ ...prev, bylawText: content }));
        break;
      case 'inANutshell':
        setFeaturedContent(prev => ({ ...prev, inANutshell: content }));
        break;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeaturedContent(prev => ({ ...prev, [name]: value }));
  };

  const validateContent = (content: PostNewFeaturedBylawType | string) => {
    if (typeof content === 'string') {
      if (!content.trim()) {
        throw new Error('Complete all fields to submit content.');
      }
    } else {
      for (const key in content) {
        if (!content[key as keyof PostNewFeaturedBylawType].trim()) {
          throw new Error(`Complete all fields to submit content.`);
        }
      }
    }
  };

  const handleSubmit = () => {
    switch (editingSection) {
      case 'new bylaw':
        postFeaturedContent();
        break;
      case 'update bylaw':
        updateFeaturedContent();
        break;
    }
  };

  const resetFields = () => {
    setFeaturedContent({
      sectionNumber: '',
      sectionTitle: '',
      description: '',
      bylawText: '',
      inANutshell: ''
    });
    setIsCheckboxChecked(false);
    setSelectedBylaw(null);
  };

  const postFeaturedContent = async () => {
    try {
      validateContent(featuredContent);
      startTransition(async () => {
        const { sectionNumber, sectionTitle, description, bylawText, inANutshell } =
          featuredContent;
        const { errorMessage } = await postNewFeaturedBylaw({
          sectionNumber,
          sectionTitle,
          description,
          bylawText,
          inANutshell
        });

        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.success('New featured content successfully added!');
          resetFields();
        }
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const updateFeaturedContent = async () => {
    if (!selectedBylaw) return;
    try {
      validateContent(featuredContent);
      startTransition(async () => {
        const { sectionNumber, sectionTitle, description, bylawText, inANutshell } =
          featuredContent;
        const id = selectedBylaw.id;
        const { errorMessage } = await updateBylaw({
          id,
          sectionNumber,
          sectionTitle,
          description,
          bylawText,
          inANutshell
        });

        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.success('Bylaw successfully updated!');
          resetFields();
        }
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex flex-col w-4/5">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-4 w-full">
          <div className="w-1/2">
            <label className="block text-lg font-bold mb-2">Section Number:</label>
            <input
              type="text"
              name="sectionNumber"
              placeholder="Bylaw section number (not displayed)."
              autoComplete="off"
              value={featuredContent?.sectionNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-lg font-bold mb-2">Section Title:</label>
            <input
              type="text"
              name="sectionTitle"
              placeholder="Bylaw section title (not displayed)."
              autoComplete="off"
              value={featuredContent?.sectionTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-bold mb-2">Add brief description:</label>
          <textarea
            name="description"
            placeholder="Text for the archive description."
            value={featuredContent?.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="w-full flex-grow mb-10">
          <h2 className="text-lg font-bold mb-2">Bylaw Text:</h2>
          <Quill
            value={featuredContent?.bylawText}
            onChange={content => handleEditorChange(content, 'featuredBylaw')}
          />
        </div>

        <div className="w-full flex-grow">
          <h2 className="text-lg font-bold mb-2">In a Nutshell:</h2>
          <Quill
            value={featuredContent?.inANutshell}
            onChange={content => handleEditorChange(content, 'inANutshell')}
          />
        </div>

        <div>
          <SubmitContentBtn
            onClick={handleSubmit}
            isPending={isPending}
            isChecked={isCheckboxChecked}
            setIsChecked={setIsCheckboxChecked}
            text="Submit"
          />
        </div>
      </div>
    </div>
  );
}
