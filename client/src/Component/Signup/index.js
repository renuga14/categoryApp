import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signup = () => {
  const history = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        history("/");
      } else {
        alert(result.message || 'Signup failed');
      }
    } catch (error) {
      alert('Something went wrong. Try again later.');
      console.error('Signup Error:', error);
    }
  };

  return (
    <div className="addUser">
      <h1 className="signup-heading">Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" className='signup-button'>Sign Up</button>
      </form>

      <button onClick={() => history("/")} className="toggle-button">
        Already have an account? Login
      </button>
    </div>
  );
};

export default Signup;
