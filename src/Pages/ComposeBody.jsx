import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { addField } from '../redux/placeholderSlice';

const ComposeBody = () => {
  const [activeEditor, setActiveEditor] = useState('web');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);
  const latestField = useSelector((state) => state.placeholders.latestField);
  

  useEffect(() => {
    if (quillRef.current) {
      window.quillEditorRef = quillRef.current.getEditor();  // Assign the Quill editor instance
      console.log('Quill editor initialized and assigned');
    }
  }, [quillRef]); 
   // Append new fields into editor
 
   useEffect(() => {
    if (!quillRef.current || !latestField) return;
  
    const editor = quillRef.current.getEditor();
    const cursorPosition = editor.getSelection()?.index || editor.getLength();
  
    editor.insertText(cursorPosition, `{{${latestField.label}}} `);
    editor.setSelection(cursorPosition + `{{${latestField.label}}} `.length);
    editor.focus();
  }, [latestField]);

 

  const modules = {
    toolbar: {
      container: '#toolbar-container'
    },
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true,
    }
  };

  const formats = [
    'header', 'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  return (
    <div className="container mt-3" style={{ marginRight: '320px' }}>
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h3 className="mb-0">
            Simple web editor
            <span className='fs-6 text-secondary d-block'>
              Use the built-in web editor to compose your document
            </span>
          </h3>
          <div className="btn-group" role="group" aria-label="Editor toggle">
            <button
              type="button"
              className={`btn ${activeEditor === 'web' ? 'text-primary border-primary' : 'btn-outline-secondary text-black no-border'}`}
              onClick={() => setActiveEditor('web')}
            >
              Web Editor
            </button>
            <button
              type="button"
              className={`btn ${activeEditor === 'msword' ? 'text-primary border-primary' : 'btn-outline-secondary text-black no-border-left'}`}
              onClick={() => setActiveEditor('msword')}
            >
              MS Word
            </button>
          </div>
        </div>
      </div>

      <div id="toolbar-container" className="mt-3 d-flex flex-wrap gap-2 p-2 bg-light rounded">
        <select className="ql-header" defaultValue="">
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="">Normal</option>
        </select>
        <select className="ql-size" defaultValue="medium">
          <option value="small" />
          <option value="medium" />
          <option value="large" />
          <option value="huge" />
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-align" value="" />
        <button className="ql-align" value="center" />
        <button className="ql-align" value="right" />
        <button className="ql-align" value="justify" />
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-undo"><i className="bi bi-arrow-counterclockwise" /></button>
        <button className="ql-redo"><i className="bi bi-arrow-clockwise" /></button>
      </div>

      <div className="mt-2">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          style={{ height: '400px', backgroundColor: 'white' }}
        />
      </div>
    </div>
  );
};

export default ComposeBody;
