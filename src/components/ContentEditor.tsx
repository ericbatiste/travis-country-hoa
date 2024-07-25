import Quill from '@/components/Quill';
import SubmitContentBtn from './SubmitContentBtn';
import { useState, useTransition, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { postNewFeaturedBylaw, updateBoardObservations } from '@/actions/apiCalls';
import { EditFeaturedContentType } from '@/actions/types';

export default function ContentEditor({ editingSection }: { editingSection: string }) {
  const [isPending, startTransition] = useTransition();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [boardContent, setBoardContent] = useState('');
  const [featuredContent, setFeaturedContent] = useState<EditFeaturedContentType>({
    sectionNumber: '',
    sectionTitle: '',
    description: '',
    bylawText: '',
    inANutshell: ''
  });

  const handleEditorChange = (content: string, section: string) => {
    switch (section) {
      case 'featuredBylaw':
        setFeaturedContent(prev => ({ ...prev, bylawText: content }));
        break;
      case 'inANutshell':
        setFeaturedContent(prev => ({ ...prev, inANutshell: content }));
        break;
      case 'boardObservations':
        setBoardContent(content);
        break;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFeaturedContent(prev => ({ ...prev, [name]: value }));
  };

  const validateContent = (content: EditFeaturedContentType | string) => {
    if (typeof content === 'string') {
      if (!content.trim()) {
        throw new Error('Add content to the board observations editor.');
      }
    } else {
      for (const key in content) {
        if (!content[key as keyof EditFeaturedContentType].trim()) {
          throw new Error(`Complete all fields to post new featured bylaw`);
        }
      }
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
    setBoardContent('');
    setIsCheckboxChecked(false);
  };

  const postFeaturedContent = async () => {
    try {
      validateContent(featuredContent);
      startTransition(async () => {
        const { sectionNumber, sectionTitle, description, bylawText, inANutshell } = featuredContent;
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

  const updateBoardContent = async () => {
    try {
      validateContent(boardContent);
      startTransition(async () => {
        const { errorMessage } = await updateBoardObservations(boardContent);
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.success('Board Observations updated successfully!');
          resetFields();
        }
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex flex-col w-4/5 max-w-screen-lg mt-8">
      {editingSection === 'bylaw' ? (
        <>
          <div className="flex justify-between gap-4 w-full">
            <div className="w-1/2">
              <label className="block text-lg font-bold mb-2">Section Number:</label>
              <input
                type="text"
                name="sectionNumber"
                placeholder="Bylaw section number (not displayed)."
                autoComplete="false"
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
                name="sectionTitle"
                placeholder="Bylaw section title (not displayed)."
                autoComplete="false"
                value={featuredContent.sectionTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-lg font-bold mb-2">Add brief description:</label>
            <textarea
              name="description"
              placeholder="Text for the archive description."
              value={featuredContent.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="w-full flex-grow mt-4 mb-4">
            <h2 className="text-lg font-bold mt-2 mb-2">Bylaw Text:</h2>
            <Quill
              value={featuredContent.bylawText}
              onChange={content => handleEditorChange(content, 'featuredBylaw')}
            />
          </div>

          <div className="w-full flex-grow mt-10 mb-6">
            <h2 className="text-lg font-bold mt-2 mb-2">In a Nutshell:</h2>
            <Quill
              value={featuredContent.inANutshell}
              onChange={content => handleEditorChange(content, 'inANutshell')}
            />
          </div>

          <SubmitContentBtn
            onClick={postFeaturedContent}
            isPending={isPending}
            isChecked={isCheckboxChecked}
            setIsChecked={setIsCheckboxChecked}
            text="Submit"
          />
        </>
      ) : (
        <>
          <div className="w-full flex-grow mb-6">
            <h2 className="text-lg font-bold mb-2">Board Observations:</h2>
            <Quill
              value={boardContent}
              onChange={content => handleEditorChange(content, 'boardObservations')}
            />
          </div>

          <SubmitContentBtn
            onClick={updateBoardContent}
            isPending={isPending}
            isChecked={isCheckboxChecked}
            setIsChecked={setIsCheckboxChecked}
            text="Submit"
          />
        </>
      )}
    </div>
  );
}
