import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const fieldSections = [
  'Employee Details',
  'Job Information',
  'Salary Components',
  'Leave Details',
  'Bank Information',
  'Document Checklist'
];

const ComposeSidebar = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className=" p-3 border-end" style={{ width: '300px', height: '100vh', overflowY: 'auto', zIndex: 0}}>
      
  
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p className=" fw-semibold">Placeholder Fields    <i class="bi bi-info-circle mb-1 ms-2"></i></p>
     
      </div>

  
      <div className="input-group mb-4">
      <span className="input-group-text bg-transparent border-end-0">
        <i className="bi bi-search text-muted"></i>
       </span>
        <input
         type="text"
         className="form-control border-start-0"
         placeholder="Search fields..."
        />
      </div>

      <div
  className="d-flex justify-content-between align-items-center mb-3 border border-bottom shadow-sm p-2"
  style={{
    borderBottom: '1px solid var(--bs-border-color-translucent)',
    backgroundColor: 'var(--bs-secondary-bg)'
  }}
>
  <p className="text-xs fw-semibold m-0" style={{ fontSize: '12px' }}>
    AUTO COMPLETE FIELDS
    <i className="bi bi-info-circle ms-2"></i>
  </p>
</div>


      {fieldSections.map(section => (
        <div key={section} className="mb-2">
          <div
            className="d-flex justify-content-between align-items-center bg-white p-2 border rounded"
            onClick={() => toggleSection(section)}
            style={{ cursor: 'pointer' }}
          >
            <span>{section}</span>
            {openSections[section] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openSections[section] && (
            <div className="ps-3 pt-2 text-muted">
              <p style={{ fontSize: '14px' }}>• Field 1</p>
              <p style={{ fontSize: '14px' }}>• Field 2</p>
              <p style={{ fontSize: '14px' }}>• Field 3</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComposeSidebar;
