import React from 'react'

const Sidebar = () => {
  return (
     <div className="bg-dark text-white vh-100 position-fixed" style={{width: '200px', top: '0', left: '0', paddingTop: '100px'}}>
          <ul className="nav flex-column">
            <li className="nav-item"><a href="#" className="nav-link text-white">INBOX</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">TIME</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">FINANCES</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">DASHBOARD</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">ORG STRUCTURE</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">EMPLOYEES</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">ENGAGEMENT</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">ONBOARDING</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">EXITS</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">EXPENSES & TRAVEL</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">DOCUMENTS</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">PROJECT</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">ASSETS</a></li>
            <li className="nav-item"><a href="#" className="nav-link text-white">HELPDESK</a></li>
          </ul>
        </div>
  )
}

export default Sidebar
