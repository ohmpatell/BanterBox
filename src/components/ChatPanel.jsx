import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { ChatContext } from '../context/ChatContext.jsx';
import Messages from './Messages.jsx';
import Input from './Input.jsx';

const ChatPanel = () => {
  const { data } = useContext(ChatContext);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Messages />
      <Input />
    </Box>
  );
};

export default ChatPanel;
