import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);
  


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo on the left */}
        <a className="navbar-brand" href="#">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/logo.png?alt=media&token=6368418c-8212-459a-a47f-c2007036e983"
            alt="Logo"
            style={{ width: '130px', marginRight: '10px', height: '40px', objectFit: 'contain' }}
          />
        </a>

        {/* Profile information on the right */}
        <div className="d-flex align-items-center">
          <img
            src={currentUser.photoURL ? currentUser.photoURL : 'https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/avatar.png?alt=media&token=84640cd9-9353-48b9-a17a-847c9f742f1f'}
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