import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addField } from '../redux/placeholderSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const ComposeSidebar = () => {
  const dispatch = useDispatch();
  const [openSections, setOpenSections] = useState({});
  const [employeeData, setEmployeeData] = useState(null);
  const [sectionData, setSectionData] = useState({});

  const fieldSections = [
    'Employee Basic Info',
    'Employee Contact Info',
    'Employee Job Info',
    'Employee Personal Info',
    'Employee Salary Info',
  ];

  const sectionKeyMap = {
    'Employee Basic Info': 'basicInfo',
    'Employee Contact Info': 'contactInfo',
    'Employee Job Info': 'jobInfo',
    'Employee Personal Info': 'personalInfo',
    'Employee Salary Info': 'salaryInfo',
  };

  useEffect(() => {
    fetch('../../data.json')
      .then(response => response.json())
      .then(data => {
        setEmployeeData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));

    const key = sectionKeyMap[section];
    if (!sectionData[section] && employeeData?.employee?.[key]) {
      setSectionData(prev => ({
        ...prev,
        [section]: employeeData.employee[key]
      }));
    }
  };

  const handleFieldClick = (label, value) => {
    console.log(value); 
    dispatch(addField({ label, value }));
    localStorage.setItem('selectedField', JSON.stringify({ label, value }));
  };

  return (
    <div className="p-3 border-end" style={{ width: '300px', height: '100vh', overflowY: 'auto', zIndex: 0 }}>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p className="fw-semibold">Placeholder Fields <i className="bi bi-info-circle mb-1 ms-2"></i></p>
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text bg-transparent border-end-0">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input type="text" className="form-control border-start-0" placeholder="Search fields..." />
      </div>

      <div
        className="d-flex justify-content-between align-items-center mb-3 border border-bottom shadow-sm p-2"
        style={{
          borderBottom: '1px solid var(--bs-border-color-translucent)',
          backgroundColor: 'var(--bs-secondary-bg)'
        }}
      >
        <p className="text-xs fw-semibold m-0" style={{ fontSize: '12px' }}>
          AUTO COMPLETE FIELDS <i className="bi bi-info-circle ms-2"></i>
        </p>
      </div>

      {fieldSections.map((section, index) => {
        const currentSectionData = sectionData[section];

        return (
          <div key={index} className="mb-2">
            <div
              className="bg-white pt-1 ps-1"
              onClick={() => toggleSection(section)}
              style={{ cursor: 'pointer' }}
            >
              {openSections[section] ? <FaChevronUp /> : <FaChevronDown />}
              <span className="ps-3 pt-1">{section}</span>
            </div>

            {openSections[section] && currentSectionData && (
              <div className="ps-4 pt-4 text-muted">
                {Object.entries(currentSectionData).map(([key, value]) => (
                  <p
                    key={key}
                    style={{ fontSize: '14px', cursor: 'pointer' }}
                    onClick={() => handleFieldClick(key, value)}
                  > 

    <i
      className="bi bi-check-circle"
      style={{ marginRight: '8px' }} 
    ></i>
                    {key}
                  </p>
                
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ComposeSidebar;
