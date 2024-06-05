import React, { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Box, Typography, Avatar } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const Message = ({ message }) => {
  if (!message) {
    return <div className="chat-area"></div>;
  } else {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const messageRef = useRef();

    useEffect(() => {
      if (messageRef.current) {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [message]);

    const messageTime = message.date.toDate().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const getFileIcon = (fileType) => {
      switch (fileType) {
        case 'application/pdf':
          return <PictureAsPdfIcon fontSize="large" />;
        case 'image':
          return <ImageOutlinedIcon fontSize="large" />;
        default:
          return <InsertDriveFileIcon fontSize="large" />;
      }
    };

    return (
      <Box
        ref={messageRef}
        sx={{
          display: 'flex',
          flexDirection: message.senderId === currentUser.uid ? 'row-reverse' : 'row',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Avatar
          src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
          alt="User Avatar"
          sx={{ width: 40, height: 40 }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: message.senderId === currentUser.uid ? 'flex-end' : 'flex-start',
            marginLeft: message.senderId === currentUser.uid ? 0 : 1,
            marginRight: message.senderId === currentUser.uid ? 1 : 0,
            maxWidth: '60%',
          }}
        >
          <Typography variant="caption" color="textSecondary">
            {messageTime}
          </Typography>
          <Box
            sx={{
              backgroundColor: message.senderId === currentUser.uid ? '#FDD835' : '#FFF',
              borderRadius: 1,
              padding: 1,
              boxShadow: 1,
              marginTop: 1,
              wordBreak: 'break-word',
            }}
          >
            {message.text && !message.img && !message.file && (
              <Typography variant="body2">{message.text}</Typography>
            )}
            {message.img && (
              <Box
                component="img"
                src={message.img}
                alt="message img"
                sx={{ maxWidth: '100%', maxHeight: '50vh', borderRadius: 1, marginTop: 1 }}
              />
            )}
            {message.file && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  maxWidth: '100%',
                  maxHeight: '50vh',
                  borderRadius: 1,
                  marginTop: 1,
                  cursor: 'pointer',
                }}
                onClick={() => window.open(message.file.downloadURL, '_blank')}
              >
                {getFileIcon(message.file.type)}
                <Typography sx={{ marginTop: 1 }}>{message.file.name}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
};

export default Message;
