import { doc, onSnapshot } from '@firebase/firestore'
import React, { useEffect } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react'
import { useState } from 'react'
const Chats = () => {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {

        const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data())
        }
        );

        return () => {
            unsub();
        }
        };
        currentUser.uid && getChats();
    }, [currentUser.uid])

   
    console.log(Object.entries(chats));
  return (

    <div className="recent-chat-container">

{Object.entries(chats).map((chat) => (
    
    <div className="mt-3 friend-container recent-container" key={chat[0]}>
      
        <div className="friend">
            <img
                src={chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : '/src/images/avatar.png'}
                alt="Avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span className="mr-2">{chat[1].userInfo.displayName}</span>
        </div>
        <p className='last-chat' style={{
        
        }}>{chat[1].userInfo.lastMessage?.text}</p>

    </div>
        ))}

    
</div>



  )
}

export default Chats