import { doc, onSnapshot } from '@firebase/firestore'
import React, { useEffect } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react'
import { useState } from 'react'
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
    const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
   
  return (

    <div className="recent-chat-container">

{Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat) => (
    
    <div className="mt-3 friend-container recent-container" key={chat[0]}
        onClick={() => handleSelect(chat[1].userInfo)}>
      
        <div className="friend">
            <img
                src={chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : 'https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/avatar.png?alt=media&token=84640cd9-9353-48b9-a17a-847c9f742f1f'}
                alt="Avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span className="mr-2">{chat[1].userInfo.displayName}</span>
        </div>
        <p className='last-chat' style={{
        
        }}>{chat[1].lastMessage?.text}</p>

    </div>
        ))}

    
</div>



  )
}

export default Chats