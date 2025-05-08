import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DocumentHeader from '../DocumentHeader';

const FinalizePage = () => {
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  useEffect(() => {
    const savedHtml = localStorage.getItem('finalHTML');
    if (savedHtml) setContent(savedHtml);
  }, []);

  const modules = { toolbar: false };
  const formats = ['bold', 'italic', 'underline', 'link'];

  return (
    <>
      <DocumentHeader />
      <style>{`
        .ql-container { border: none !important; box-shadow: none !important; }
      `}</style>

      <div className="d-flex">
        <div className="flex-grow-1">
          <div className="d-flex justify-content-center border-top bg" style={{ padding: '20px 0' }}>
            <div className="custom-shadow rounded p-2" style={{
              width: '100%', maxWidth: '1000px', height: '1000px',
              backgroundColor: 'white', marginTop: '20px', marginBottom: '20px',
            }}>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                readOnly={true}
                modules={modules}
                formats={formats}
                style={{ height: '600px' }}
              />
            </div>
          </div>
        </div>
        <div style={{ width: '600px' }}></div>
      </div>
    </>
  );
};

export default FinalizePage;
