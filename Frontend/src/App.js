import React from 'react';
import SignUP from './component/SignUP';
import Login from './component/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Dashboard from './component/Dashboard';
import './index.css';
import Home from './component/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="background-image-container">
        <Routes> 
        <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
