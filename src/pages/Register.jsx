import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {
  Container,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Alert
} from "@mui/material";

const Register = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("src/images/avatar.png");
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    let avatar = e.target.avatar.files[0];

    if (!avatar) {
      avatar = await fetch("https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/avatar.png?alt=media&token=84640cd9-9353-48b9-a17a-847c9f742f1f")
        .then(res => res.blob());
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      const data = new Date().getTime();
      const storageRef = ref(storage, `${displayName + data}`);

      await uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: displayName,
              email: email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (error) {
      setErr(true);
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        setErrmessage("Email already in use");
      } else if (errorCode === "auth/invalid-email") {
        setErrmessage("Invalid Email");
      } else if (errorCode === "auth/weak-password") {
        setErrmessage("Weak Password: Password should be at least 6 characters");
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/logo.png?alt=media&token=6368418c-8212-459a-a47f-c2007036e983"
        alt="Logo"
        className="mb-4 logo"
        style={{ marginBottom: "1rem" }}
      />
      <Card sx={{ p: 4, width: "100%" }}>
        <Typography component="h1" variant="h5" align="center">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <img src={avatarPreview} alt="Avatar" style={{ width: "40px", marginRight: "8px" }} />
            <Button variant="contained" component="span">
              Choose Avatar
            </Button>
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {err && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errMessage}
            </Alert>
          )}
          <Typography align="center">
            Have an account? <MuiLink component={Link} to="/login">Login</MuiLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Register;
