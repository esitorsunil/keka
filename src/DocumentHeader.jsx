import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DocumentHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const quillRef = useRef(null); // Assuming you have a ref for the Quill editor

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
      // htmlContent already holds replaced HTML
      const htmlContent = localStorage.getItem('htmlContent');
      navigate('/finalize');
    }
  };

  
  const handleCancel = () => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const htmlContent = editor.root.innerHTML; // Get the editor content (HTML with text and placeholders)
      localStorage.setItem('htmlContent', htmlContent); // Save the content to localStorage
    }
  
    if (currentStep === 1) {
      navigate('/'); // Navigate to Setup page
    } else if (currentStep === 2) {
      navigate('/setup'); // Navigate back to Setup
    } else if (currentStep === 3) {
      navigate('/compose'); // Navigate back to Compose
    }
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

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
                        : 'bg-white  border '
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
                <button className="btn purple px-4" onClick={handleSave}>
                  Save Template
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-light border px-4" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn purple px-4" onClick={handleContinue}>
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
