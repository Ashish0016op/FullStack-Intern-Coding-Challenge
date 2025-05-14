import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import SystemAdmDashboard from './pages/SystemAdmDashboard';

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/store-owner-dashboard' element={<StoreOwnerDashboard/>}/>
        <Route path='/system-adm-dashboard' element={<SystemAdmDashboard/>}/>
      </Routes>
    </>
  )
}

export default App
