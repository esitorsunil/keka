import React from 'react'
import { useNavigate } from 'react-router-dom'



const HomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="container mt-5">
        <h3>Welcome!</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate('/setup')}
        >
          Create Template
        </button>
      </div>
  )
}
 export default HomePage;