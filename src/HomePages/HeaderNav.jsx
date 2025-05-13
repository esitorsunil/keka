import { useState } from 'react';

const HeaderNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="d-flex align-items-center" style={{ backgroundColor: '#3d376d', padding: '8px 5px' }}>
        <img
          src="https://d2w2i7rp1a0wob.cloudfront.net/static/images/logos/KekaLogoBlack.svg"
          alt="Keka Logo"
          className="keka-logo"
          style={{ filter: 'invert(2)', width: '120px', height: '30px' }}
        />
      </div>

      <header
        className="flex-grow-1 d-flex flex-column flex-md-row align-items-center justify-content-between px-3"
        style={{ color: 'white', height: '50px' }}
      >

        <div className="d-md-none d-flex align-items-center justify-content-end w-100">
          <button
            className="btn text-white fs-4"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>

        <div className="d-none d-md-flex align-items-center w-100">
          <span className="ms-2">SYSTECHCORP PRIVATE LIMITED</span>

          <div className="ms-3 position-relative w-100" style={{ maxWidth: '500px', flexGrow: 1 }}>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search employees or actions (Ex: Apply Leave)"
              aria-label="Search"
              style={{
                borderRadius: '25px',
                border: '2px solid #ddd',
                backgroundColor: '#f8f9fa',
                paddingRight: '70px',
              }}
            />
            <i className="bi bi-search position-absolute top-50 start-3 translate-middle-y text-muted ps-3"></i>
            <span
              style={{
                position: 'absolute',
                top: '50%',
                right: '18px',
                transform: 'translateY(-50%)',
                padding: '3px 8px',
                borderRadius: '15px',
                backgroundColor: 'hsl(240, 62.50%, 96.90%)',
                cursor: 'pointer',
                color: 'black',
                fontSize: '12px',
              }}
              onClick={() => console.log('Alt+K pressed')}
            >
              Alt+K
            </span>
          </div>
        </div>

        <div className="d-none d-md-flex align-items-center">
          <i className="bi bi-rocket-takeoff me-4 fs-5"></i>
          <i className="bi bi-gear me-4 fs-5"></i>
          <i className="bi bi-question-circle me-4 fs-5"></i>
          <span
            className="ms-3 text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '32px', height: '32px', backgroundColor: 'orange' }}
          >
            BT
          </span>
        </div>
      </header>

      {menuOpen && (
        <div className="d-md-none px-3 py-2 bg-light text-dark border-top ">
          <div className="mb-2">SYSTECHCORP PRIVATE LIMITED</div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search employees or actions"
              aria-label="Search"
            />
          </div>
          <div className="d-flex justify-content-around fs-5 mt-2">
            <i className="bi bi-rocket-takeoff"></i>
            <i className="bi bi-gear"></i>
            <i className="bi bi-question-circle"></i>
            <span
              className="text-white rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px', backgroundColor: 'orange' }}
            >
              BT
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNav;
