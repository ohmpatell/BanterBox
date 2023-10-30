import React from 'react'
import { faVideo, faEllipsisV, faImage, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input.jsx';
import { ChatContext } from '../context/ChatContext.jsx';
import { useContext } from 'react';
import Messages from './Messages.jsx';


const ChatPanel = () => {

  const {data} = useContext(ChatContext);
  console.log("DATA FROM CHATPANEL: ", data.chatId);


  return (
    <div className='chat-panel-container'>
      <div className="chat-panel">
        <div className="chat-header">
          <div className="user-info">
            <img
              src={data.user?.photoURL ? data.user?.photoURL : '/src/images/avatar.png'}
              alt="User Avatar"
              className="avatar"
            />
            <span className="user-name">{data.user?.displayName}</span>
          </div>
          <div className="icons">
            <FontAwesomeIcon icon={faVideo} className="icon" />
            <FontAwesomeIcon icon={faEllipsisV} className='icon'/>
          </div>
        </div>
        
        <Messages/>
      
        <Input/>
      

      
      </div>
    </div>
  )
}

export default ChatPanel