'use client';

import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import { useEffect } from 'react';

interface EditorProps {
  onChange: (content: string) => void;
}

export default function Editor({ onChange }: EditorProps) {
  const theme = 'snow';
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image'],
      [{ color: [] }, { background: [] }]
      // ['clean'],
    ],
    clipboard: {
      matchVisual: false
    }
  };
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'indent',
    'size',
    'header',
    'link',
    'image',
    // 'video',
    'color',
    'background'
    // 'clean',
  ];

  const { quill, quillRef } = useQuill({ theme, modules, formats });

  useEffect(() => {
    if (quill && onChange) {
      quill.on('text-change', () => {
        const content = quill.root.innerHTML;
        onChange(content);
      });
    }
  }, [quill, onChange]);

  return (
    <div className="w-full min-w-[400px] h-[300px] ">
      <div ref={quillRef} className="h-full" />
    </div>
  );
}
