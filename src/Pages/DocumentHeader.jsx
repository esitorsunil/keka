import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import html2pdf from 'html2pdf.js'; 

const DocumentHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const quillRef = useRef(null);

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
      navigate('/finalize');
    }
  };

  const handleCancel = () => {
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

const handleSave = async () => {
  const savedTemplate = JSON.parse(localStorage.getItem('documentTemplate'));
  const finalHTML = localStorage.getItem('finalHTML');

  if (!savedTemplate || !savedTemplate.name || !finalHTML) {
    alert('Missing saved template or final HTML!');
    return;
  }

  const element = document.createElement('div');
  element.innerHTML = finalHTML;

  const opt = {
    margin: 0.5,
    filename: `${savedTemplate.name}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  const pdfBase64 = await html2pdf().from(element).set(opt).outputPdf('datauristring');

  const existingTemplates = JSON.parse(localStorage.getItem('templateList')) || [];
  
  existingTemplates.push({
    name: savedTemplate.name,
    pdfData: pdfBase64,
  });

  localStorage.setItem('templateList', JSON.stringify(existingTemplates));

  setShowToast(true);
  setTimeout(() => {
    setShowToast(false);
    navigate('/');  
  }, 2000);
};


  return (
    <>
      <div className="shadow bg-body-tertiary rounded" style={{ position: 'sticky', top: 0, zIndex: 1 }}>

        <div className="d-flex justify-content-between align-items-center border-bottom px-4 py-3 flex-wrap">
          <h5 className="mb-0 fw-semibold">Document template</h5>
          <i className="bi bi-x-lg fs-5" role="button"></i>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center p-3">

          <ol className="d-flex flex-wrap list-unstyled m-0 justify-content-center flex-grow-1 custom-gap">
            {[1, 2, 3].map((step) => {
              const labels = ['SETUP', 'COMPOSE', 'FINALIZE'];
              return (
                <li key={step} className="d-flex align-items-center gap-2 me-3 mb-2">
                  <span
                    className={`step-circle ${
                      currentStep === step
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white border'
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

          <div className="d-flex gap-2 mt-3 mt-md-0 ms-auto flex-wrap">
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
  <div
    className="toast show position-fixed bottom-0 start-50 translate-middle-x mb-3"
    role="alert"
  >
    <div className="toast-header bg-success text-white border-0">
      <strong className="me-auto">Success</strong>
      <button
        type="button"
        className="btn-close btn-close-white"
        onClick={() => setShowToast(false)}
      />
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
