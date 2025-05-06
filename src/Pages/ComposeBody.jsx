import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ComposeBody = () => {
  const [activeEditor, setActiveEditor] = useState('web'); 

  return (
    <div className="container mt-2" style={{ marginRight: '320px' }}> 
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Simple web editor<span className='fs-6 text-secondary'><br /> Use the built-in web editor to compose your document</span></h3>

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
              className={`btn border-muted  ${activeEditor === 'msword' ? 'text-primary border-primary' : 'btn-outline-secondary text-black no-border-left'}`}
              onClick={() => setActiveEditor('msword')}
            >
              MS Word
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeBody;
