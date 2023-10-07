import React from 'react'

const Chats = () => {
  return (

    <div className="recent-chat-container">

    <div className="mt-3 friend-container recent-container">
        <div className="friend">
            <img
                src="src/images/avatar.png"
                alt="Avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span className="mr-2">Friend Name</span>
        </div>
        <p className='last-chat' style={{
        
        }}>Message</p>
    </div>

    <div className="mt-3 friend-container recent-container">
        <div className="friend">
            <img
                src="src/images/avatar.png"
                alt="Avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span className="mr-2">Friend Name</span>
        </div>
        <p className='last-chat' style={{
        
        }}>Message</p>
    </div>

    <div className="mt-3 friend-container recent-container">
        <div className="friend">
            <img
                src="src/images/avatar.png"
                alt="Avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span className="mr-2">Friend Name</span>
        </div>
        <p className='last-chat' style={{
        
        }}>Message</p>
    </div>

</div>



  )
}

export default Chats