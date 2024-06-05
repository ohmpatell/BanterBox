import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Avatar, Typography, Box } from '@mui/material';

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
    <Box sx={{ flexGrow: 1 }}>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <Box
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
          sx={{
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
            display: 'flex',
            alignItems: 'center',
            p: 1,
          }}
        >
          <Avatar
            src={chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : 'https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/avatar.png?alt=media&token=84640cd9-9353-48b9-a17a-847c9f742f1f'}
            alt="Avatar"
            sx={{ width: 30, height: 30, borderRadius: '50%', mr: 1 }}
          />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {chat[1].userInfo.displayName}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
                {chat[1].lastMessage?.text}
              </Typography>
            </Box>
          </Box>

        </Box>
      ))}
    </Box>
  );
};

export default Chats;
