import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DocumentHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quillRef = useRef(null); // Declare quillRef
  const [showToast, setShowToast] = useState(false);

  const getStepFromPath = (path) => {
    if (path === '/setup') return 1;
    if (path === '/compose') return 2;
    if (path === '/finalize') return 3;
    return 1;
  };

  const currentStep = getStepFromPath(location.pathname);

  const handleContinue = () => {
    if (currentStep === 1) {
      navigate('/compose');
    } else if (currentStep === 2) {
      const htmlContent = localStorage.getItem('htmlContent');
      if (htmlContent) {
        localStorage.setItem('finalHTML', htmlContent);
      }
      navigate('/finalize');
    }
  };

  const handleCancel = () => {
    // Save the editor content to localStorage before navigating
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const htmlContent = editor.root.innerHTML;
      localStorage.setItem('htmlContent', htmlContent);
    }

    if (currentStep === 1) {
      navigate('/');
    } else if (currentStep === 2) {
      navigate('/setup');
    } else if (currentStep === 3) {
      navigate('/compose');
    }
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  // Load content from localStorage when the component is mounted (for Compose page)
  useEffect(() => {
    if (currentStep === 2) {
      const savedHtml = localStorage.getItem('htmlContent');
      if (savedHtml && quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.root.innerHTML = savedHtml;
      }
    }
  }, [currentStep]);

  // Auto-save content on every change in Quill editor (important for preserving changes)
  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      editor.on('text-change', () => {
        const htmlContent = editor.root.innerHTML;
        localStorage.setItem('htmlContent', htmlContent);
      });
    }
  }, []);

  return (
    <>
      <div className="shadow bg-body-tertiary rounded" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <div className="d-flex justify-content-between align-items-center border-bottom px-4 py-3">
          <h5 className="mb-0 fw-semibold">Document template</h5>
          <i className="bi bi-x-lg fs-5" role="button"></i>
        </div>

        <div className="d-flex justify-content-between align-items-center p-3">
          <ol className="d-flex list-unstyled m-0 justify-content-center flex-grow-1 custom-gap">
            {[1, 2, 3].map((step) => {
              const labels = ['SETUP', 'COMPOSE', 'FINALIZE'];
              return (
                <li key={step} className="d-flex align-items-center gap-2">
                  <span
                    className={`step-circle ${
                      currentStep === step
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-primary border border-primary'
                    }`}
                  >
                    {step}
                  </span>
                  <span
                    className={`${
                      currentStep === step ? 'text-indigo-500 fw-semibold' : 'text-indigo-400'
                    }`}
                  >
                    {labels[step - 1]}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="d-flex gap-3 ml-auto">
            {currentStep === 3 ? (
              <>
                <button className="btn btn-light border px-4" onClick={handleCancel}>
                  Back
                </button>
                <button className="btn btn-primary px-4" onClick={handleSave}>
                  Save Template
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-light border px-4" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn btn-primary px-4" onClick={handleContinue}>
                  Continue
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast show position-fixed top-0 start-50 translate-middle-x mt-3" role="alert">
          <div className="toast-header">
            <strong className="me-auto">Success</strong>
            <button type="button" className="btn-close" onClick={() => setShowToast(false)} />
          </div>
          <div className="toast-body">Document saved successfully!</div>
        </div>
      )}
    </>
  );
};

export default DocumentHeader;
