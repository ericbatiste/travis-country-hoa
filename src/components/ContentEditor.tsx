import { useState, useTransition, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/errorMsg';
import { postNewFeaturedBylaw, updateBoardObservations, updateBylaw } from '@/actions/apiCalls';
import { GetBylawsType, PostNewFeaturedBylawType } from '@/actions/types';
import FeaturedBylawEditor from './FeaturedBylawEditor';
import BoardObservationsEditor from './BoardObservationsEditor';
import UpdateBylawEditor from './UpdateBylawEditor';

export default function ContentEditor({ editingSection }: { editingSection: string }) {
  const [isPending, startTransition] = useTransition();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedBylaw, setSelectedBylaw] = useState<GetBylawsType | null>(null);
  const [boardContent, setBoardContent] = useState('');
  const [featuredContent, setFeaturedContent] = useState<PostNewFeaturedBylawType>({
    sectionNumber: '',
    sectionTitle: '',
    description: '',
    bylawText: '',
    inANutshell: ''
  });

  useEffect(() => {
    resetFields();
  }, [editingSection]);

  useEffect(() => {
    if (selectedBylaw && setFeaturedContent) {
      setFeaturedContent({
        sectionNumber: selectedBylaw.section_number,
        sectionTitle: selectedBylaw.section_title,
        description: selectedBylaw.description,
        bylawText: selectedBylaw.bylaw_text,
        inANutshell: selectedBylaw.in_a_nutshell,
      });
    }
  }, [selectedBylaw, setFeaturedContent]);

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
        updateBylawContent();
        break;
      case 'board':
        updateBoardContent();
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
    setBoardContent('');
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

  const updateBylawContent = async () => {
    if (!selectedBylaw) return;
    try {
      validateContent(featuredContent);
      startTransition(async () => {
        const { sectionNumber, sectionTitle, description, bylawText, inANutshell } =
          featuredContent;
        const id = selectedBylaw.id
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
      {editingSection === 'new bylaw' && (
        <FeaturedBylawEditor
          selectedBylaw={selectedBylaw}
          featuredContent={featuredContent}
          setFeaturedContent={setFeaturedContent}
          handleEditorChange={handleEditorChange}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isPending={isPending}
          isCheckboxChecked={isCheckboxChecked}
          setIsCheckboxChecked={setIsCheckboxChecked}
        />
      )}
      {editingSection === 'update bylaw' && (
        <UpdateBylawEditor
          selectedBylaw={selectedBylaw}
          setSelectedBylaw={setSelectedBylaw}
          featuredContent={featuredContent}
          setFeaturedContent={setFeaturedContent}
          handleEditorChange={handleEditorChange}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isPending={isPending}
          isCheckboxChecked={isCheckboxChecked}
          setIsCheckboxChecked={setIsCheckboxChecked}
        />
      )}
      {editingSection === 'board' && (
        <BoardObservationsEditor
          boardContent={boardContent}
          handleEditorChange={handleEditorChange}
          handleSubmit={handleSubmit}
          isPending={isPending}
          isCheckboxChecked={isCheckboxChecked}
          setIsCheckboxChecked={setIsCheckboxChecked}
        />
      )}
    </div>
  );
}