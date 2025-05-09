import React from 'react'

const HeaderNav = () => {
  return (
    <div>
      <header className="text-white py-2 px-4 d-flex align-items-center justify-content-between">
  <div className="d-flex align-items-center">
    <span className="">SYSTECHCORP PRIVATE LIMITED</span>
    {/* Search Bar */}
 <div className="ms-3 position-relative" style={{ width: '500px', flexGrow: 1 }}>
  <input
    type="text"
    className="form-control ps-5" // Add padding to the left for the icon
    placeholder="Search employees or actions (Ex: Apply Leave)"
    aria-label="Search"
    style={{ paddingRight: '30px' }} // Right padding
  />
  <i className="bi bi-search position-absolute top-50 start-3 translate-middle-y text-muted"></i> {/* Icon inside */}
</div>
  </div>
  <div className="d-flex align-items-center">
    <button className="btn btn-primary-subtle text-white me-3">AR + K</button>
    <span className="me-3">Keshav Aggarwal</span>
    <span className="bg-primary-subtle text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>BT</span>
  </div>
</header>

          <nav className="bg-dark text-white">
            <ul className="nav px-4 py-2">
              <li className="nav-item"><a href="#" className="nav-link text-white">DASHBOARD</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">EMPLOYEES</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">ORG STRUCTURE</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">ONBOARDING</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">EXITS</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">EXPENSES & TRAVEL</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">DOCUMENTS</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">ENGAGEMENT</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">ASSETS</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">HELPDESK</a></li>
              <li className="nav-item"><a href="#" className="nav-link text-white">SETTINGS</a></li>
            </ul>
          </nav>
    </div>
  )
}

export default HeaderNav
