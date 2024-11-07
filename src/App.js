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
import Attendance from './components/Attendance'
import AttendanceActivity from './components/AttendanceActivity';
import AttendanceRequest from './components/AttendanceRequest';
import NewAttendanceRequest from './components/NewAttendanceRequest';
import MyClaims from './components/MyClaims';
import MyPeople from './components/MyPeople';
import MyPaySlips from './components/MyPaySlips';
import WorkFromHome from './components/WorkFromHome';
import Resignation from './components/Resignation';
import Holidays from './components/Holidays';
import NewResignation from './components/NewResignation';
import ChangePassword from './components/ChangePassword';
 
function App() {
  return (

      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<EmployeeDashboard />}>
            <Route path="profile" element={<Profiles />} />
            <Route path='leave-request' element={<LeaveRequests />}/>
            <Route path="new-leave-request" element={<NewLeaveRequest />} />
            <Route path="leave-balance" element={<LeaveBalances />} /> 

            <Route path='attendance' element={<Attendance/>} /> 
            <Route path="attendance-activity" element={<AttendanceActivity />} /> 
            <Route path="attendance-request" element={<AttendanceRequest />} /> 
            <Route path='newattendacerequest' element={<NewAttendanceRequest/>} />
          
            <Route path="myclaims" element={<MyClaims />} /> 
            <Route path='mypeople' element={<MyPeople/>} />
            <Route path="mypayslips" element={<MyPaySlips />} /> 
            <Route path='workfromhome' element={<WorkFromHome/>} />
            <Route path="resignation" element={<Resignation />} />
            <Route path='newattendacerequest' element={<NewResignation/>} /> 
            <Route path='holidays' element={<Holidays/>} />
          </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/change-password" element={<ChangePassword />} /> 
        {/* <Route path="/dashboard2" element={<Dashboard />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
