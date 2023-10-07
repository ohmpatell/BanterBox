import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import { db } from "../firebase";



const Register = () => {
  const [err, setErr] = useState(false);
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
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, avatar);


      uploadTask.on(
          
        
        (error) => {
          setErr(true);
          setErrmessage(error.message);
          // Handle unsuccessful uploads
        },
        () => {
          
          
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            console.log("File available at", downloadURL);

            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL
            })

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: displayName,
              email: email,
              photoURL: downloadURL
            });
    

          });
        }
      );


        // Storing the user to database




    } catch (error) {
      setErr(true);
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
    // ..
  };

  // Image Upload




















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
          <p>Don't have an accout? Register</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
