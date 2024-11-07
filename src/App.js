import React from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
// import Dashboard from './components/Dashboard';
import './App.css';
import EmployeeDashboard from './components/EmployeeDashboard'
import LeaveBalances from './components/LeaveBalances';
import NewLeaveRequest from './components/NewLeaveRequest';
import Profiles from './components/Profile';
import LeaveRequests from './components/LeaveRequest';

 
function App() {
  return (

      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<EmployeeDashboard />}>
           <Route path="profile" element={<Profiles />} />
           <Route path='leave-request' element={<LeaveRequests />}/>
           <Route path="new-leave-request" element={<NewLeaveRequest />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/leave-balance" element={<LeaveBalances />} /> 
        <Route path="/new-leave-request" element={<NewLeaveRequest />} />
        
        {/* <Route path="/dashboard2" element={<Dashboard />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
