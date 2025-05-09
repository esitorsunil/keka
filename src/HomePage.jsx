import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import HeaderNav from './HeaderNav'
import { useState } from 'react';

const HomePage = () => {
  const [activeLink, setActiveLink] = useState("DASHBOARD"); // Track active link

  const menuItems = [
    "DASHBOARD",
    "EMPLOYEES",
    "ORG STRUCTURE",
    "ONBOARDING",
    "EXITS",
    "EXPENSES & TRAVEL",
    "DOCUMENTS",
    "ENGAGEMENT",
    "ASSETS",
    "HELPDESK",
    "SETTINGS",
  ];
    const navigate = useNavigate();
  return (
    <>
     <div className="flex-grow-1" >
           <HeaderNav />
         <div className="flex-grow-1 d-flex ">
          <Sidebar /> 
          <div className="flex-grow-1" >
             <nav className="shadow-sm position-relative">
  <ul className="nav px-3 py-2 gap-3">
    {menuItems.map((item) => (
      <li className="nav-item position-relative" key={item}>
        <a
          href="#"
          className={`nav-link px-2 ${activeLink === item ? "text-black" : "text-muted"}`}
          onClick={() => setActiveLink(item)}
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
              top: "70%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "4px",
            }}
          />
        )}
      </li>
    ))}
  </ul>
</nav>
<div className='p-5'>
             <h3>Welcome!</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate('/setup')}
        >
          Create Template
        </button>
        </div>
          </div>
          </div>
        </div>
      </>
  )
}
 export default HomePage;