import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

const Login = () => {
 
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const [errMessage, setErrmessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }

        catch (err) {
            setErr(true);
            setErrmessage(err.code);
            if (err.code === "auth/invalid-login-credentials") {
                setErrmessage("Invalid email or password");
            }

            else{
                setErrmessage("Something went wrong");
            }
            



        }
    };
 
 
    return (

    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
        <img src="https://firebasestorage.googleapis.com/v0/b/banter-box-chatapp.appspot.com/o/logo.png?alt=media&token=6368418c-8212-459a-a47f-c2007036e983" alt="Logo" className="mb-4 logo" />
        <div className="card p-4 formWrapper">
            <p className="title">Login</p>
            <form action="" method="post" className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required/>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required/>
                </div>
                <button type="submit" className="btn btn-warning">Login</button>
                {err && (
            <p style={{ color: "red", fontSize: "15px" }}>{errMessage}</p>
          )}
                <p>Don't have an accout? <Link to="/register">Register</Link></p>
            </form>
        </div>
    </div>


  );
};

export default Login;
