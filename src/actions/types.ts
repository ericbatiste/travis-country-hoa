import { ChangeEvent } from 'react';

export type EditFeaturedContentType = {
  sectionNumber: string;
  sectionTitle: string;
  description: string;
  bylawText: string;
  inANutshell: string;
};

export type PostNewFeaturedBylawParams = {
  sectionNumber: string;
  sectionTitle: string;
  description: string;
  bylawText: string;
  inANutshell: string;
};

export type AllBylawsType = {
  id?: string;
  created_at?: string;
  section_number?: string;
  section_title?: string;
  description?: string;
  bylaw_text?: string;
  in_a_nutshell?: string;
}

export type FeaturedBylawContentType = {
  bylaw_text?: string;
  in_a_nutshell?: string;
};

export type BoardObservationsContentType = {
  id?: string;
  last_updated?: string;
  content?: string;
};

export type ReturnsErrorMsg = {
  errorMessage: string | null;
}

export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  status: string;
};

export type UserRegistrationCardProps = {
  user: UserType;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onResendCode: (id: string) => void;
};

export type AdminEditorProps = {
  featuredContent?: EditFeaturedContentType;
  boardContent?: string;
  handleEditorChange: (content: string, section: string) => void;
  handleInputChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isPending: boolean;
  isCheckboxChecked: boolean;
  setIsCheckboxChecked: (checked: boolean) => void;
  postFeaturedContent?: () => void;
  updateBoardContent?: () => void;
};

export type QuillProps = {
  value?: string
  onChange: (content: string) => void;
}