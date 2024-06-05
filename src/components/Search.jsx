import React, { useContext, useState } from 'react';
import { db } from '../firebase';
import { collection, doc, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDocs, where, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { TextField, Box, Typography, Avatar } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Clear } from '@mui/icons-material';


const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.displayName !== currentUser.displayName) {
          setUser(userData);
          setErr(false);
        } else {
          setUser(null); // Reset user if searching own name
          setErr(true);
        }
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Code to handle selection
  };

  const handleClear = () => {
  }

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search a user"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {username && (
                <IconButton onClick={() => {
                  setUsername("");
                  setUser(null);
                  setErr(false);
                }}>
                  <Clear />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />

      {err && (
        <Typography color="error" sx={{ mt: 1 }}>
          User not found
        </Typography>
      )}

      {user && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            cursor: 'pointer',
          }}
          onClick={handleSelect}
        >
          <Avatar
            src={user.photoURL}
            alt={user.displayName}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography>{user.displayName}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Search;
