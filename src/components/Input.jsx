// import React, { useState, useContext } from 'react';
// import { faImage, faFile, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ChatContext } from '../context/ChatContext.jsx';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { db, storage } from '../firebase';
// import { doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { v4 as uuid } from 'uuid';
// import { Box, IconButton, InputBase, Typography, Button } from '@mui/material';

// const Input = () => {
//   const [text, setText] = useState('');
//   const [img, setImg] = useState(null);
//   const [imgPreview, setImgPreview] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     if (!text && !img) {
//       return; // Do nothing if both text and image are empty
//     }
//     if (img) {
//       const storageRef = ref(storage, uuid());
//       const uploadTask = uploadBytesResumable(storageRef, img);
      
//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.error("Error uploading image:", error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateDoc(doc(db, "chats", data.chatId), {
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.uid,
//                 date: Timestamp.now(),
//                 img: downloadURL,
//               }),
//             });
//           });
//         }
//       );
//     } else {
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now(),
//         }),
//       });

//       await updateDoc(doc(db, "userChats", currentUser.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });

//       await updateDoc(doc(db, "userChats", data.user.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });

//       setText("");
//       setImg(null);
//     }
//     setText('');
//     setImg(null);
//     setImgPreview(null);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImgPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
  
//       setImg(file);
//     }
//   };

//   const cancelImagePreview = () => {
//     setImg(null);
//     setImgPreview(null);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Backspace' && !text && imgPreview) {
//       cancelImagePreview();
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', padding: 1  }}>
//       {imgPreview && (
//         <Box sx={{ position: 'relative', mb: 2, textAlign: 'center', padding: 1 }}>
//           <Box
//             component="img"
//             src={imgPreview}
//             alt="Preview"
//             sx={{ maxWidth: '100%', maxHeight: 200, borderRadius: 2, boxShadow: 1}}
//           />
//           <IconButton
//             sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
//             onClick={cancelImagePreview}
//           >
//             <FontAwesomeIcon icon={faTimes} />
//           </IconButton>
//         </Box>
//       )}
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <InputBase
//           placeholder="Type your message..."
//           sx={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: 2, padding: '8px', mr: 1 }}
//           onChange={(e) => setText(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//           onKeyDown={handleKeyDown}
//           value={text}
//         />
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <input
//             type="file"
//             name="image"
//             id="image"
//             style={{ display: 'none' }}
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//           <label htmlFor="image">
//             <IconButton component="span">
//               <FontAwesomeIcon icon={faImage} />
//             </IconButton>
//           </label>
//           <input type="file" name="file" id="file" style={{ display: 'none' }} />
//           <label htmlFor="file">
//             <IconButton component="span">
//               <FontAwesomeIcon icon={faFile} />
//             </IconButton>
//           </label>
//           <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 1 }}>
//             Send
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Input;


import React, { useState, useContext } from 'react';
import { faImage, faFile, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatContext } from '../context/ChatContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { db, storage } from '../firebase';
import { doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { Box, IconButton, InputBase, Typography, Button } from '@mui/material';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!text && !img && !file) {
      return; // Do nothing if both text, image, and file are empty
    }
    
    if (img) {
      const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Error uploading image:", error);
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
    } else if (file) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, file);
          
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              console.error("Error uploading image:", error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    file: {downloadURL, name: file.name, type: file.type},
                  }),
                });
              console.log('File uploaded successfully: ', file);
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
      setFile(null);
    }
    setText('');
    setImg(null);
    setImgPreview(null);
    setFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
  
      setImg(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const cancelImagePreview = () => {
    setImg(null);
    setImgPreview(null);
  };

  return (
    <Box sx={{ width: '100%', padding: 1  }}>
      {imgPreview && (
        <Box sx={{ position: 'relative', mb: 2, textAlign: 'center', padding: 1 }}>
          <Box
            component="img"
            src={imgPreview}
            alt="Preview"
            sx={{ maxWidth: '100%', maxHeight: 200, borderRadius: 2, boxShadow: 1}}
          />
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
            onClick={cancelImagePreview}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Box>
      )}

      {/* File preview section */}
      {file && (
        <Box sx={{ position: 'relative', mb: 2, textAlign: 'center', padding: 1 }}>
          <Typography>{file.name}</Typography>
          <FontAwesomeIcon icon={faFile} size="3x" />
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
            onClick={() => setFile(null)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <InputBase
          placeholder="Type your message..."
          sx={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: 2, padding: '8px', mr: 1 }}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          value={text}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="file"
            name="image"
            id="image"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="image">
            <IconButton component="span">
              <FontAwesomeIcon icon={faImage} />
            </IconButton>
          </label>
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <IconButton component="span">
              <FontAwesomeIcon icon={faFile} />
            </IconButton>
          </label>
          <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 1 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Input;
