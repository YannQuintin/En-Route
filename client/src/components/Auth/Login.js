import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../Services/auth.services";
import './Auth.css';

const initialState = { username: "", password: "" };

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const service = new AuthService();

  // Function to handle form submit in the input fields
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password } = loginState;

    service
      .login(username, password)
      .then((response) => {
        setLoginState({ username: "", password: "" });
        props.getUser(response);
      })
      .catch((error) => {
        const { message } = error.response.data;
        setLoginErrorMsg(message);
        console.log(error);
      });
  };

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={loginState.username}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
        />

        <input type="submit" value="Login" />
      </form>
      <br />

      {loginErrorMsg && <span style={{ color: "red" }}>{loginErrorMsg}</span>}

      <p>
        Don't have account yet?
        <Link to={"/signup"}>Signup</Link>
      </p>

      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            {/* <img src={loginImg} /> */}
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Register
          </button>
        </div>
      </div>


    </div>
  );
};

export default Login;