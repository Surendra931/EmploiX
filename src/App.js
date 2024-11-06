import React from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
// import Dashboard from './components/Dashboard';
import './App.css';
import EmployeeDashboard from './components/EmployeeDashboard'
import LeaveBalances from './components/LeaveBalances';

 
function App() {
  return (

      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/leave-balance" element={<LeaveBalances />} /> 

        {/* <Route path="/dashboard2" element={<Dashboard />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
