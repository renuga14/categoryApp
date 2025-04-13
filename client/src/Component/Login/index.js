import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation 
    if (name && password) {
      fetch(`${apiUrl}/login1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: name, password: password })
        ,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'Login successful' && data.token) {
            console.log('✅ Welcome!', data.user, "Token:", data.token);

            localStorage.setItem("token", data.token); // Save token
            history("/sidebar"); // redirect to Sidebar page
          } else {
            console.log('Login failed:', data.message);
          }
        })
        .catch((err) => console.error('Error:', err));
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <div className="addUser">
      <h1 className="loginheading">Login</h1>
      <form className="loginForm" onSubmit={handleLogin}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">Login</button>
      </form>

      <button onClick={() => history("/signup")} className="toggle-button">
        Don't have an account? Signup
      </button>
    </div>
  );
};

export default Login;
