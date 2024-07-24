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