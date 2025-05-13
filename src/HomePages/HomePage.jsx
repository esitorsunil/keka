import { useNavigate } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("DOCUMENTS");
  const [activeSubLink, setActiveSubLink] = useState("Document Template");
  const [templates, setTemplates] = useState([]);
  const [popupIndex, setPopupIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [templateIndexToDelete, setTemplateIndexToDelete] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('templateList')) || [];
    setTemplates(stored);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.popup-menu') && !e.target.closest('.bi-three-dots')) {
        setPopupIndex(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const downloadPDF = (name, pdfData) => {
    const link = document.createElement('a');
    link.href = pdfData;
    link.download = `${name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteTemplate = (indexToDelete) => {
    const updated = templates.filter((_, i) => i !== indexToDelete);
    setTemplates(updated);
    localStorage.setItem('templateList', JSON.stringify(updated));
    setPopupIndex(null);
  };

  const menuItems = [
    "DASHBOARD", "EMPLOYEES", "ORG STRUCTURE", "ONBOARDING", "EXITS",
    "EXPENSES & TRAVEL", "DOCUMENTS", "ENGAGEMENT", "ASSETS", "HELPDESK", "SETTINGS"
  ];

  const documentSubItems = [
    "Document Template", "Employee Documents", "Organizational Documents"
  ];

  return (
    <div className="flex-grow-1">
      <HeaderNav />
      <div className="d-flex">
        <Sidebar />

        <div className="flex-grow-1">
          {/* Top Menu Tabs */}
          <nav className="position-relative">
            <ul className="nav px-3 py-2 gap-3 shadow-sm">
              {menuItems.map((item) => (
                <li className="nav-item position-relative" key={item}>
                  <a
                    href="#"
                    className={`nav-link px-2 ${activeLink === item ? "text-black" : "text-muted"}`}
                    onClick={() => {
                      setActiveLink(item);
                      if (item === "DOCUMENTS") {
                        setActiveSubLink("Document Template");
                      }
                    }}
                  >
                    {item}
                  </a>
                  {activeLink === item && (
                    <img
                      width="22"
                      height="22"
                      src="https://img.icons8.com/glyph-neue/64/7950F2/sort-up.png"
                      alt="sort-up"
                      className="position-absolute"
                      style={{
                        top: "70%", left: "50%",
                        transform: "translateX(-50%)", marginTop: "4px",
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* Sub Tabs for DOCUMENTS */}
            {activeLink === "DOCUMENTS" && (
              <ul className="nav px-3 py-1 gap-3 mt-2">
                {documentSubItems.map((subItem) => (
                  <li className="nav-item" key={subItem}>
                    <a
                      href="#"
                      className={`nav-link px-2 pb-2 ${activeSubLink === subItem
                        ? "text-black border-bottom border-2 border-black fw-bold"
                        : "text-muted"
                        }`}
                      onClick={() => setActiveSubLink(subItem)}
                    >
                      {subItem}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          {/* Page Content */}
          <div className="p-4">
            {activeLink === "DOCUMENTS" && activeSubLink === "Document Template" && (
              <>
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h3 className="mb-2">Document Template</h3>
                    <p className="text-muted mb-0">
                      Generate agreements, employee letters or compliance forms and send for signature/upload/acknowledgement
                    </p>
                  </div>
                  <button
                    className="btn d-flex align-items-center gap-2 px-3 py-2 rounded create-template-btn"
                    onClick={() => navigate('/setup')}
                  >
                    <span style={{ fontSize: "1.2rem" }}>+</span>
                    Create Template
                    <i className="bi bi-caret-down-fill" style={{ fontSize: "0.9rem" }}></i>
                  </button>
                </div>

                {/* Filters */}
                <div className="d-flex align-items-center flex-wrap py-2 m-3 ms-1">
                  <div className="d-flex align-items-center rounded" style={{ minWidth: '200px', cursor: 'pointer' }}>
                    <span className="me-2">Action Type</span>
                    <img width="15" height="15" src="https://img.icons8.com/ios/50/expand-arrow--v2.png" alt="expand" />
                  </div>
                  <div className="d-flex align-items-center rounded px-3 py-2" style={{ minWidth: '200px', cursor: 'pointer' }}>
                    <span className="me-2">Template Status</span>
                    <img width="15" height="15" src="https://img.icons8.com/ios/50/expand-arrow--v2.png" alt="expand" />
                  </div>
                  <div className="position-relative flex-grow-1" style={{ maxWidth: '1500px' }}>
                    <input type="text" className="form-control ps-5" placeholder="Search" style={{ borderRadius: '25px' }} />
                    <i className="bi bi-search position-absolute top-50 start-3 translate-middle-y text-muted ps-3"></i>
                  </div>
                </div>

                {/* Table Headers */}
                <div className="d-flex justify-content-between align-items-center py-2 m-3 ms-1 fw-semibold" style={{ backgroundColor: '#f8f9fa' }}>
                  <div style={{ minWidth: '20%' }}>Document Name</div>
                  <div style={{ minWidth: '20%' }}>Folder</div>
                  <div style={{ minWidth: '20%' }}>Action Type</div>
                  <div style={{ minWidth: '20%' }}>Last Used</div>
                  <div style={{ minWidth: '20%' }}>Action</div>
                </div>

                {/* Template Rows */}
                {templates.length === 0 ? (
                  <p className="ms-4">No templates saved.</p>
                ) : (
                  templates.map((template, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center py-2 m-3 ms-1 position-relative">
                      <div style={{ minWidth: '20%' }} className="fw-semibold text">{template.name}</div>
                      <div style={{ minWidth: '20%' }}>
                        <i className="bi bi-folder2-open me-2"></i>
                        <span role="button" onClick={() => alert('Employee Letters clicked')}>Employee Letters</span>
                      </div>
                      <div style={{ minWidth: '20%' }}> <i class="bi bi-file-earmark me-2"></i>Document Generation</div>
                      <div style={{ minWidth: '20%' }}>
                        <i className="bi bi-clock-history me-2"></i>2 days ago
                      </div>
                      <div style={{ minWidth: '20%' }} className="d-flex align-items-center gap-2">
                        <button className="btn btn-sm p-2 px-3 create-template-btn" onClick={() => downloadPDF(template.name, template.pdfData)}>
                          Generate
                        </button>
                        <div className="position-relative">
                          <i
                            className="bi bi-three-dots"
                            style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                            onClick={() => setPopupIndex(popupIndex === index ? null : index)}
                          ></i>
                          {popupIndex === index && (
                            <div className="popup-menu position-absolute border border-danger bg-white shadow-sm rounded p-2 ps-3"
                              style={{
                                top: '-10px',
                                left: '120%',
                                zIndex: 100,
                                width: '80px',
                                whiteSpace: 'nowrap',
                              }}>
                              <div
                                className="text-danger fw-semibold"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setTemplateIndexToDelete(index);
                                  setShowConfirm(true);
                                  setPopupIndex(null);
                                }}
                              >
                                Delete
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this template?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDeleteTemplate(templateIndexToDelete);
                    setShowConfirm(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
