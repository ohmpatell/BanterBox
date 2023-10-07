import React from 'react'
import { faVideo, faEllipsisV, faImage, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = () => {
  return (
<div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          className="text-input"
        />
        <div className="options">
          <input type="file" name="image" id="image" style={{display:"none"}}  accept='image/*' />
          <label htmlFor="image" className='icon'>
            <FontAwesomeIcon icon={faImage} className="icon" />
          </label>
          <input type="file" name="file" id="file" style={{display:"none"}}/>
          <label htmlFor="file" className='icon'>
            <FontAwesomeIcon icon={faFile} className="icon" />
          </label>
          
          <button className="send-button">Send</button>
        </div>
        
      </div>  )
}

export default Input