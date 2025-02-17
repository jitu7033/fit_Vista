import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

   history("/landing") // Redirect to landing page

    // try {
    //   const response = await axios.post("http://localhost:5000/api/auth/login", {
    //     email,
    //     password,
    //   });
    //   // On successful login, store token and redirect
    //   localStorage.setItem("token", response.data.token); // Store the token
    //   history.push("/landing"); // Redirect to landing page
    // } catch (err) {
    //   console.error(err.response.data.message);
    //   setError(err.response.data.message); // Show error message from backend
    // }
  };

  return (
    <div className="auth-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
