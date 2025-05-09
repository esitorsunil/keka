const HeaderNav = () => {
   
  return (
    <>
      <header className="text-white py-2 px-4 d-flex align-items-center justify-content-between">
  <div className="d-flex align-items-center">
     <img
          src="https://d2w2i7rp1a0wob.cloudfront.net/static/images/logos/KekaLogoBlack.svg"
          alt="Keka Logo"
          className="keka-logo"
          style={{ filter: 'invert(2)', width: '120px', height: '30px', }}
        />
    <span className="ms-4">SYSTECHCORP PRIVATE LIMITED</span>
 <div className="ms-3 position-relative" style={{ width: '500px', flexGrow: 1 }}>
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
      padding: '3px',
      borderRadius: '15px',
      backgroundColor: 'hsl(240, 62.50%, 96.90%)',
      cursor: 'pointer',
      color: 'black', 
    }}
    onClick={() => console.log('Alt+K pressed')}
  >
    Alt+K
  </span>
</div>
  </div>
  <div className="d-flex align-items-center">
    <i className="bi bi-rocket-takeoff me-4 fs-5" ></i>
<i className="bi bi-gear me-4 fs-5"></i>
<i className="bi bi-question-circle me-4 fs-5"></i>
    <span className="ms-3 text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px',  backgroundColor: 'orange'}}>BT</span>
  </div>
</header>
</>
  )
}

export default HeaderNav