'use client';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { QuillProps } from '@/utils/types';

export default function Quill({ value, onChange }: QuillProps) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image'],
    ],
    clipboard: {
      matchVisual: true
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
  ];

  return (
    <div style={{ width: '100%', minWidth: '700px', height: '300px' }}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Enter content as you would like to see it displayed on screen..."
        className='h-80'
      />
    </div>
  );
}
