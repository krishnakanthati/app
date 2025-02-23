// src/components/Auth/Login.js

import React, { useState } from 'react';
import { loginUser } from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Call the loginUser function with the credentials
      const response = await loginUser({ username, password });
      
      // Save token and username in localStorage.
      // Change "access_token" to "token" if your backend returns it as such.
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('username', username);
      
      // Redirect user to the editor page upon successful login.
      navigate('/editor');
    } catch (error) {
      setError('Invalid username or password');
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
