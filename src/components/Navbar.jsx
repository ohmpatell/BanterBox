import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo on the left */}
        <a className="navbar-brand" href="#">
          <img
            src="src/images/logo.png"
            alt="Logo"
            style={{ width: '130px', marginRight: '10px', height: '40px', objectFit: 'contain' }}
          />
        </a>

        {/* Profile information on the right */}
        <div className="d-flex align-items-center">
          <img
            src="src/images/avatar.png"
            alt="Avatar"
            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
          />
          <a href="#" className="btn btn-outline-primary btn-sm">
            Logout
          </a>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar