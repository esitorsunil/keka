import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DocumentHeader from '../DocumentHeader';

const FinalizePage = () => {
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  const modules = {
    toolbar: false,
  };

  const formats = ['bold', 'italic', 'underline', 'link'];

  return (
    <>
      <DocumentHeader />

      {/* Internal styles to remove Quill borders */}
      <style>
        {`
          .ql-container {
            border: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
      <div className="d-flex">
      <div className="flex-grow-1" >

      {/* Main wrapper with background color */}
      <div
        className="d-flex justify-content-center border-top bg"
        style={{
       // Background color applied to the outer container
          padding: '20px 0', // Optional padding for spacing
        }}
      >
        {/* Editor container with shadow and rounded corners */}
        <div
          className="custom-shadow rounded p-2"
          style={{
            width: '100%',
            maxWidth: '1000px',
            height: '1000px',
            backgroundColor: 'white', // White background for the editor container
            marginTop: '20px', // Optional margin
            marginBottom: '20px', // Optional margin
          }}
        >
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            style={{ height: '600px' }} // Editor height
          />
        </div>
      </div>
      </div>
      <div style={{ width: '600px' }}>
          
        </div>
        </div>
    </>
  );
};

export default FinalizePage;
