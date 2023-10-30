import React from 'react'
import { faVideo, faEllipsisV, faImage, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatContext } from '../context/ChatContext.jsx';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { db, storage } from '../firebase';
import { doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
 

const Input = () => {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error);
          console.log("error"); 
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      }, 
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };


  return (
<div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          className="text-input"

          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          value={text}

        />
        <div className="options">
          <input type="file" name="image" id="image" style={{display:"none"}}  accept='image/*' 
          onChange={(e) => setImg(e.target.files[0])} 
          />
          <label htmlFor="image" className='icon'>
            <FontAwesomeIcon icon={faImage} className="icon" />
          </label>
          <input type="file" name="file" id="file" style={{display:"none"}}/>
          <label htmlFor="file" className='icon'>
            <FontAwesomeIcon icon={faFile} className="icon" />
          </label>
          
          <button className="send-button" onClick={handleSend}>Send</button>
        </div>
        
      </div>  )
}

export default Input