import { useState, useTransition, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { postNewFeaturedBylaw, updateBoardObservations } from '@/actions/apiCalls';
import { EditFeaturedContentType } from '@/actions/types';
import FeaturedBylawEditor from './FeaturedBylawEditor';
import BoardObservationsEditor from './BoardObservationsEditor';

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
        <FeaturedBylawEditor
          featuredContent={featuredContent}
          handleEditorChange={handleEditorChange}
          handleInputChange={handleInputChange}
          isPending={isPending}
          isCheckboxChecked={isCheckboxChecked}
          setIsCheckboxChecked={setIsCheckboxChecked}
          postFeaturedContent={postFeaturedContent}
        />
      ) : (
        <BoardObservationsEditor
          boardContent={boardContent}
          handleEditorChange={handleEditorChange}
          isPending={isPending}
          isCheckboxChecked={isCheckboxChecked}
          setIsCheckboxChecked={setIsCheckboxChecked}
          updateBoardContent={updateBoardContent}
        />
      )}
    </div>
  );
}

