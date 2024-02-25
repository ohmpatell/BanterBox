import React from 'react'
import { faVideo, faEllipsisV, faImage, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input.jsx';
import { ChatContext } from '../context/ChatContext.jsx';
import { useContext } from 'react';
import Messages from './Messages.jsx';


const ChatPanel = () => {

  const {data} = useContext(ChatContext);

  return (
    <div className='chat-panel-container'>
      <div className="chat-panel">
        <div className="chat-header">
          <div className="user-info">
            <img
              src={data.user?.photoURL ? data.user?.photoURL : 'https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/avatar.png?alt=media&token=84640cd9-9353-48b9-a17a-847c9f742f1f'}
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