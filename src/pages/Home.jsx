import React from 'react'
import ChatPanel from '../components/ChatPanel'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (

<div className="d-flex home-container" id="wrapper">
    <div className="wrapper">
    <div className='sidebar'>< Sidebar/></div>
    <div className='chatpanel'>< ChatPanel/></div>
    </div>
</div>

  )
}

export default Home