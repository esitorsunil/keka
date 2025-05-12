import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentHeader from './DocumentHeader';

const Setup = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Load saved values from localStorage when component mounts
  useEffect(() => {
    const savedName = localStorage.getItem('setupName');
    const savedDescription = localStorage.getItem('setupDescription');
    if (savedName) setName(savedName);
    if (savedDescription) setDescription(savedDescription);
  }, []);

  // Save to localStorage whenever name changes
  useEffect(() => {
    localStorage.setItem('setupName', name);
  }, [name]);

  // Save to localStorage whenever description changes
  useEffect(() => {
    localStorage.setItem('setupDescription', description);
  }, [description]);

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  return (
    <>
      <DocumentHeader />

      <div className="ms-4 mt-4 py-3">
        <div className="d-flex justify-content-start">
          <div style={{ width: '40%' }}>

            <div className="mb-4">
              <h5 className="mb-2">Name</h5>
              <input
                type="text"
                className="form-control px-3 py-2"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <h5 className="mb-2">Describe this document template</h5>

              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={modules}
                className="bg-white custom-quill-editor"
                placeholder="Write your description here..." 
              />

              <div id="toolbar" className="border-top-0">
                <span className="ql-formats">
                  <button className="ql-bold" />
                  <button className="ql-italic" />
                  <button className="ql-underline" />
                  <button className="ql-link" />
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Setup;
