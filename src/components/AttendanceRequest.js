import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewAttendanceRequest from './NewAttendanceRequest'; 
import '../css/adjust.css'
 
import { useNavigate } from 'react-router-dom';


const AttendanceRequest = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate=useNavigate();
  const handleCreateNewClick = () => {
    navigate('/newattendacerequest');
  };

  const handleDataSubmit = (newRecord) => {
    setAttendanceData([...attendanceData, newRecord]);
    setShowNewRequest(false); 
  };

  return (
    
      <div className='Request-random'>
        <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Request Attendance</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#FFCC00', '&:hover': { backgroundColor: '#FFC107' } }}
              startIcon={<AddIcon />}
              onClick={handleCreateNewClick}
            >
              Create New
            </Button>
          </Box>

          <Divider />

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#D3D3D3' }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Check-in</TableCell>
                  <TableCell>Check-out</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No data found!</TableCell>
                  </TableRow>
                ) : (
                  attendanceData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.checkin}</TableCell>
                      <TableCell>{record.checkout}</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
   
  );
};

export default AttendanceRequest;
