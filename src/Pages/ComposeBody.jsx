import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

const ComposeBody = () => {
  const [activeEditor, setActiveEditor] = useState('web');
  const [content, setContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const quillRef = useRef(null);

  // Get all selected fields from Redux
  const selectedFields = useSelector((state) => state.placeholders.selectedFields || []);

  // Insert only the latest placeholder into the editor when a new one is added
  useEffect(() => {
    const savedContent = localStorage.getItem('htmlContent');
    if (savedContent && quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor) {
        // Only restore content if it's not already there
        if (editor.root.innerHTML === '<p><br></p>' || editor.root.innerHTML === '') {
          editor.root.innerHTML = savedContent;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!quillRef.current || selectedFields.length === 0) return;
  
    const latestField = selectedFields[selectedFields.length - 1]; // Most recent field
    const editor = quillRef.current.getEditor();
    const cursorPosition = editor.getSelection()?.index || editor.getLength();
  
    editor.updateContents(
      {
        ops: [
          { retain: cursorPosition },
          { insert: `{{${latestField.label}}} ` }
        ]
      },
      'user'
    );
  
    editor.setSelection(cursorPosition + `{{${latestField.label}}} `.length);
    editor.focus();
  }, [selectedFields]);

  
  

  const handleUndo = () => {
    const editor = quillRef.current?.getEditor();
    if (editor) editor.history.undo();
  };

  const handleRedo = () => {
    const editor = quillRef.current?.getEditor();
    if (editor) editor.history.redo();
  };

  // Replace all placeholders with matching values
  const replacePlaceholders = (htmlContent) => {
    if (!selectedFields.length) return htmlContent;

    const placeholderRegex = /{{(.*?)}}/g;
    return htmlContent.replace(placeholderRegex, (_, placeholder) => {
      const match = selectedFields.find(f => f.label === placeholder.trim());
      return match ? match.value : `{{${placeholder}}}`;
    });
  };

  const handleEditorChange = (value) => {
    setContent(value);
    const replaced = replacePlaceholders(value); // your own logic
    localStorage.setItem("htmlContent", value);
  };
  
  const modules = {
    toolbar: {
      container: '#toolbar-container',
    },
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true,
    },
  };

  const formats = [
    'header', 'size', 'bold', 'italic', 'underline',
    'list', 'bullet', 'align', 'link', 'image',
  ];

  return (
    <>
      <style>
        {`
          .ql-container {
            border: none !important;
            box-shadow: none !important;
          }
        `}
      </style>

      <div className="container mt-3" style={{ marginRight: '320px' }}>
        <div className="row border-bottom pb-4">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h3 className="mb-0 ps-3">
              Simple web editor
              <span className="fs-6 text-secondary d-block">
                Use the built-in web editor to compose your document
              </span>
            </h3>
            <div className="btn-group pe-3" role="group">
              <button
                type="button"
                className={`btn ${activeEditor === 'web' ? 'text-primary border-primary bg-body-tertiary ' : 'btn-outline-secondary text-black no-border'}`}
                onClick={() => setActiveEditor('web')}
              >
                Web Editor
              </button>
              <button
                type="button"
                className={`btn ${activeEditor === 'msword' ? 'text-primary border-primary bg-body-tertiary' : 'btn-outline-secondary text-black no-border-left'}`}
                onClick={() => setActiveEditor('msword')}
              >
                MS Word
              </button>
            </div>
          </div>
        </div>

        <div id="toolbar-container" className="d-flex flex-wrap gap-2 p-3 rounded">
          <button className="ql-image"></button>
          <select className="ql-header" defaultValue="">
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="">Paragraph</option>
          </select>
          <select className="ql-size" defaultValue="medium">
            <option value="small">12px</option>
            <option value="medium">16px</option>
            <option value="large">20px</option>
            <option value="huge">24px</option>
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-link" />
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-align" value="" />
          <button className="ql-align" value="center" />
          <button className="ql-align" value="right" />
          <button className="ql-align" value="justify" />

          <button type="button" onClick={handleUndo} className="btn btn-outline-secondary">
            <i className="bi bi-arrow-90deg-left" />
          </button>
          <button type="button" onClick={handleRedo} className="btn btn-outline-secondary">
            <i className="bi bi-arrow-90deg-right"/>
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center border-top">
        <div
          className="custom-shadow rounded p-2 mt-5 mb-5"
          style={{ width: '100%', maxWidth: '1050px', backgroundColor: 'white' }}
        >
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
            style={{ height: '600px' }}
          />
        </div>
      </div>


      <div className="container mt-4">
        <h4 className="text-center">Live Preview</h4>
        <div
          className="card shadow-sm"
          style={{ backgroundColor: '#f8f9fa', padding: '20px', marginTop: '20px' }}
        >
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: previewContent }}
            style={{ minHeight: '200px' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ComposeBody;
