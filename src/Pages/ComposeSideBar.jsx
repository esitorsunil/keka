import React, { useState } from 'react';
import { FaInfoCircle, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
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
    <div className="shadow bg-body-tertiary rounded bg-light p-3 border-end z-1" style={{ width: '300px', height: '100vh', overflowY: 'auto' }}>
      
      {/* Placeholder Fields Heading */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Placeholder Fields</strong>
        <FaInfoCircle className="text-muted" />
      </div>

      {/* Search bar */}
      <div className="input-group mb-4">
        <span className="input-group-text"><FaSearch /></span>
        <input
          type="text"
          className="form-control"
          placeholder="Search fields..."
        />
      </div>

      {/* Autocomplete Fields Heading */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Autocomplete Fields</strong>
        <FaInfoCircle className="text-muted" />
      </div>

      {/* Expandable Field Sections */}
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
