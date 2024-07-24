import DOMPurify from "isomorphic-dompurify";

export const sanitizeHTML = (html: string) => {
  return { __html: DOMPurify.sanitize(html) };
};