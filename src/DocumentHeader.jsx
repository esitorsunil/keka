import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setStep } from './redux/stepSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const DocumentHeader = () => {
  const { currentStep } = useSelector((state) => state.step);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showToast, setShowToast] = useState(false);

  const handleContinue = () => {
    if (location.pathname === '/setup') {
      dispatch(setStep(2));
      navigate('/compose');
    } else if (location.pathname === '/compose') {
      dispatch(setStep(3));
      navigate('/finalize');
    }
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000); 
  };

  const handleCancel = () => {
    if (location.pathname === '/setup') {
      navigate('/');
    } else if (location.pathname === '/compose') {
      dispatch(setStep(1));
      navigate('/setup');
    } else if (location.pathname === '/finalize') {
      dispatch(setStep(2));
      navigate('/compose');
    }
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
            <li className="d-flex align-items-center gap-2">
              <span
                className={`step-circle ${currentStep === 1 ? 'bg-indigo-500 text-white' : 'bg-white text-primary border border-primary'}`}
              >
                1
              </span>
              <span className={`${currentStep === 1 ? 'text-indigo-500 fw-semibold' : 'text-indigo-400'}`}>SETUP</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <span
                className={`step-circle ${currentStep === 2 ? 'bg-indigo-500 text-white' : 'bg-white text-primary border border-primary'}`}
              >
                2
              </span>
              <span className={`${currentStep === 2 ? 'text-indigo-500 fw-semibold' : 'text-indigo-400'}`}>COMPOSE</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <span
                className={`step-circle ${currentStep === 3 ? 'bg-indigo-500 text-white' : 'bg-white text-primary border border-primary'}`}
              >
                3
              </span>
              <span className={`${currentStep === 3 ? 'text-indigo-500 fw-semibold' : 'text-indigo-400'}`}>FINALIZE</span>
            </li>
          </ol>

          <div className="d-flex gap-3 ml-auto">
            {currentStep === 3 ? (
              <>
                <button type="button" className="btn btn-light border border-black-200 px-4" onClick={handleCancel}>
                  Back
                </button>
                <button type="button" className="btn btn-primary px-4" onClick={handleSave}>
                  Save Template
                </button>
              </>
            ) : (
              <>
                <button type="button" className="btn btn-light border border-black-200 px-4" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary px-4" onClick={handleContinue}>
                  Continue
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast show position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Success</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Document saved successfully!
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentHeader;
