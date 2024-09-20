import { MailListMember } from 'mailgun.js';

export type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  monthlyCloseUp: boolean;
  questionnaire: boolean;
}

export type SubscribersType = {
  monthlyCloseUp: MailListMember[];
  questionnaire: MailListMember[];
};

export type PostNewFeaturedBylawType = {
  sectionNumber: string;
  sectionTitle: string;
  description: string;
  bylawText: string;
  inANutshell: string;
  boardAction: string;
};

export type BylawParamsType = {
  id: string;
  sectionNumber: string;
  sectionTitle: string;
  description: string;
  bylawText: string;
  inANutshell: string;
  boardAction: string;
}

export type GetBylawsType = {
  id: string;
  created_at: string;
  section_number: string;
  section_title: string;
  description: string;
  bylaw_text: string;
  in_a_nutshell: string;
  board_action: string;
}

export type FeaturedBylawContentType = {
  bylaw_text: string;
  in_a_nutshell: string;
  board_action: string;
};

export type ReturnsErrorMsg = {
  errorMessage: string | null;
};

export type UpdateBylawCardProps = {
  id: string;
  createdAt: string;
  sectionNumber: string;
  sectionTitle: string;
  bylaws: GetBylawsType[];
  setSelectedBylaw: (bylaw: GetBylawsType) => void;
};

export type FeaturedMonthlyEditorProps = {
  editingSection: string;
  selectedBylaw: GetBylawsType | null;
  setSelectedBylaw: React.Dispatch<React.SetStateAction<GetBylawsType | null>>;
}

export type SubmitContentBtnProps = {
  onClick?: () => void;
  isPending: boolean;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  text: string;
};

export type QuillProps = {
  value?: string
  onChange: (content: string) => void;
}