'use client';

import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import { useEffect } from 'react';

interface EditorProps {
  onChange: (content: string) => void;
}

export default function Quill({ onChange }: EditorProps) {
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
  const placeholder = 'Enter content as you would like to see it displayed on screen...';

  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });

  useEffect(() => {
    if (quill && onChange) {
      quill.on('text-change', () => {
        const content = quill.root.innerHTML;
        onChange(content);
      });
    }
  }, [quill, onChange]);

  return (
    <div style={{ width: '100%', minWidth: '700px', height: '300px' }}>
      <div ref={quillRef} />
    </div>
  );
}
