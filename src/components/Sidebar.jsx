import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';
import { Box } from '@mui/material';

const Sidebar = () => {
  return (
    <Box sx={{ width: 340, backgroundColor: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Search />
      <Chats />
    </Box>
  );
}

export default Sidebar;
