import React from 'react'
import { faVideo, faEllipsisV, faImage, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from './Message.jsx';
import Input from './Input.jsx';


const ChatPanel = () => {
  return (
    <div className='chat-panel-container'>
      <div className="chat-panel">
        <div className="chat-header">
          <div className="user-info">
            <img
              src="/src/images/avatar.png"
              alt="User Avatar"
              className="avatar"
            />
            <span className="user-name">John Doe</span>
          </div>
          <div className="icons">
            <FontAwesomeIcon icon={faVideo} className="icon" />
            <FontAwesomeIcon icon={faEllipsisV} className='icon'/>
          </div>
        </div>
        
        <Message/>
      
        <Input/>
      

      
      </div>
    </div>
  )
}

export default ChatPanel