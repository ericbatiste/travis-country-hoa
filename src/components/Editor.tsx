"use client"

import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';

export default () => {
  const { quill, quillRef } = useQuill();

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};