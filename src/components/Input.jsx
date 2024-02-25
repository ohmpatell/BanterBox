import React, { useState } from 'react';
import { faVideo, faEllipsisV, faImage, faFile, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatContext } from '../context/ChatContext.jsx';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { db, storage } from '../firebase';
import { doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // State for image preview

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

    const handleSend = async () => {
      if (img) {
        console.log('Uploading image... with ', img);
        const storageRef = ref(storage, uuid());
  
        const uploadTask = uploadBytesResumable(storageRef, img);
        
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Error uploading image:", error);
          },
          () => {
            // Upload complete
            console.log("Image upload complete!");
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
              console.log('Image uploaded:', downloadURL);
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
  

    setText('');
    setImg(null);
    setImgPreview(null); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
  
      setImg(file);
      console.log('Image state:', file);
    }
  };
  

  const cancelImagePreview = () => {
    setImg(null);
    setImgPreview(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && !text && imgPreview) {
      cancelImagePreview();
    }
  };

  return (
    <div style={{width : '100%'}}>
      <div className="message-input">
      <div className="image-preview-container">
        {imgPreview && (
          <div className="image-preview">
            <button className="cancel-preview" onClick={cancelImagePreview}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img src={imgPreview} alt="Preview" />
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        className="text-input"
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        onKeyDown={handleKeyDown}
        value={text}
      />
      <div className="options">
        <input
          type="file"
          name="image"
          id="image"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="image" className="icon">
          <FontAwesomeIcon icon={faImage} className="icon" />
        </label>
        <input type="file" name="file" id="file" style={{ display: 'none' }} />
        <label htmlFor="file" className="icon">
          <FontAwesomeIcon icon={faFile} className="icon" />
        </label>

        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
      </div>
    </div>
  );
};

export default Input;
