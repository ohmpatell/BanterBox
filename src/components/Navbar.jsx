import React, { useState, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Button, Box, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(auth);
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FDD835' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
        {/* Logo on the left */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/logo.png?alt=media&token=6368418c-8212-459a-a47f-c2007036e983"
            alt="Logo"
            style={{ width: '130px', height: '40px', objectFit: 'contain' }}
          />
        </Box>

        {/* Profile information on the right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleClick}>
            <Avatar
              src={currentUser.photoURL ? currentUser.photoURL : 'https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/avatar.png?alt=media&token=84640cd9-9353-48b9-a17a-847c9f742f1f'}
              alt="Avatar"
              sx={{ width: 30, height: 30 }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
