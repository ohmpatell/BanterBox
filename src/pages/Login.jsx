import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
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

const Login = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
      if (err.code === "auth/invalid-login-credentials") {
        setErrmessage("Invalid email or password");
      } else {
        setErrmessage("Something went wrong");
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {err && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errMessage}
            </Alert>
          )}
          <Typography align="center">
            Don't have an account? <MuiLink component={Link} to="/register">Register</MuiLink>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
