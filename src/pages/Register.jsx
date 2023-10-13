import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [errMessage, setErrmessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.username.value;
    console.log(displayName);
    const email = e.target.email.value;
    console.log(email);
    const password = e.target.password.value;
    const avatar = e.target.avatar.files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      window.alert("User Created Successfully");

      //Unique image name
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


            await setDoc(doc(db, "userChats", res.user.uid), {
              navigate: navigate("/"),
              
            });

          } catch (err) {
            console.log(err);
            SetErr(true);
            //setLoading(false);
          }
        });
      });
    } catch (error) {
      setErr(true);
      //setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorCode === "auth/email-already-in-use") {
        setErrmessage("Email already in use");
      } else if (errorCode === "auth/invalid-email") {
        setErrmessage("Invalid Email");
      } else if (errorCode === "auth/weak-password") {
        setErrmessage(
          "Weak Password: Password should be at least 6 characters"
        );
      }
    }
  };

  return (
    <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <img src="src/images/logo.png" alt="Logo" className="mb-4 logo" />
      <div class="card p-4 formWrapper">
        <p className="title">Register</p>
        <form action="" method="post" className="form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="file"
              class="form-control-file"
              id="avatar"
              name="avatar"
              accept="image/*"
              style={{ display: "none" }}
            />
            <label htmlFor="avatar" className="avatarLabel">
              <img src="src/images/avatar.png" alt="" />
              <span> Choose Avatar</span>
            </label>
          </div>
          <button type="submit" class="btn btn-warning">
            Register
          </button>
          {err && (
            <p style={{ color: "red", fontSize: "15px" }}>{errMessage}</p>
          )}
          <p>Have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
