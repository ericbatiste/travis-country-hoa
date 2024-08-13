import DOMPurify from "isomorphic-dompurify";

export const sanitizeHTML = (html: string) => {
  return DOMPurify.sanitize(html, {
    FORBID_ATTR: ['style'],
  });
};

