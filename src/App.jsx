import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Editor from './components/Editor/Editor';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute';  // Import Protected Route

const App = () => {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/editor" element={<Editor />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
