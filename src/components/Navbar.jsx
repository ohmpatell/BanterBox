import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);
  if(currentUser.photoURL == null || currentUser.photoURL == undefined){
    currentUser.photoURL = 'src/images/avatar.png'
  }


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
            src={currentUser.photoURL}
            alt="Avatar"
            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
          />
          <button className="btn btn-outline-primary btn-sm" onClick={() => signOut(auth)}>
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar