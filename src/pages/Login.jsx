import React from "react";

const Login = () => {
  return (

    <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100">
        <img src="src/images/logo.png" alt="Logo" className="mb-4 logo" />
        <div class="card p-4 formWrapper">
            <p className="title">Login</p>
            <form action="" method="post" className="form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" name="username" required/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required/>
                </div>
                <button type="submit" class="btn btn-warning">Login</button>
                <p>Don't have an accout? Register</p>
            </form>
        </div>
    </div>


  );
};

export default Login;
