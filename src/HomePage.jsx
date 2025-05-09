
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import HeaderNav from './HeaderNav'

const HomePage = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1" style={{marginLeft: '200px'}}>
            <HeaderNav />
          </div>
        </div>
    <div className="container mt-5">
        <h3>Welcome!</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate('/setup')}
        >
          Create Template
        </button>
      </div>
      </>
  )
}
 export default HomePage;