import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearField } from '../redux/placeholderSlice';

const ComposeBody = () => {
  const [activeEditor, setActiveEditor] = useState('web');
  const [content, setContent] = useState('');
  const quillRef = useRef(null);
  const dispatch = useDispatch();
  const latestField = useSelector((state) => state.placeholders.selectedField);

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
    if (!quillRef.current || !latestField) return;
  
    const editor = quillRef.current.getEditor();
    const cursorPosition = editor.getSelection()?.index || editor.getLength();
  
    const placeholderToken = `{{${latestField.label}}}`;
  
    // Check to avoid inserting the same placeholder repeatedly
    if (!editor.getText().includes(placeholderToken)) {
      editor.updateContents(
        {
          ops: [
            { retain: cursorPosition },
            { insert: `${placeholderToken} ` },
          ],
        },
        'user'
      );
      editor.setSelection(cursorPosition + placeholderToken.length + 1);
      editor.focus();
    }
  
    // Clear the field from Redux after use to prevent duplication
    dispatch(clearField());
  }, [latestField, dispatch]);

  const handleUndo = () => {
    const editor = quillRef.current?.getEditor();
    if (editor) editor.history.undo();
  };

  const handleRedo = () => {
    const editor = quillRef.current?.getEditor();
    if (editor) editor.history.redo();
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

  const flattenObject = (obj, parentKey = '', result = {}) => {
    for (const key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
    return result;
  };

  const replacePlaceholdersWithValues = (htmlContent, flatData) => {
    return htmlContent.replace(/{{(.*?)}}/g, (_, label) => {
      const key = Object.keys(flatData).find(
        (k) => k.toLowerCase().endsWith(label.trim().toLowerCase())
      );
      return key ? flatData[key] : `{{${label}}}`;
    });
  };

  // Inside onChange of ReactQuill:
  const handleEditorChange = (value) => {
    setContent(value); // update local state
    localStorage.setItem("htmlContent", value); // store raw HTML
  };

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
            <div className="btn-group pe-3" role="group" aria-label="Editor toggle">
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
    </>
  );
};

export default ComposeBody;
