import React from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../css/adjust.css';
 


const AttendanceActivity = () => {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const attendanceData = [
    { date: '2024-10-10', checkin: '09:00 AM', checkout: '05:00 PM' },
    { date: '2024-10-11', checkin: '09:15 AM', checkout: '05:05 PM' },
    { date: '2024-10-12', checkin: '09:05 AM', checkout: '05:10 PM' },
  ];

  return (

    
    <div className='Attendance-random'>
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px', }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Attendance Activity
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label="From Month"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
              sx={{
                '& .MuiSvgIcon-root': { color: 'blueviolet' }, // Change color of calendar icon
              }}
            />
            <DatePicker
              label="To Month"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
              sx={{
                '& .MuiSvgIcon-root': { color: 'blueviolet' }, 
              }}
            />
          </Box>
        </LocalizationProvider>
      </Box>

      <Divider />

      <TableContainer component={Paper} sx={{ mt: 2, width: '100%' }}>
        <Table sx={{ width: '100%' }}> 
          <TableHead >
            <TableRow sx={{backgroundColor:'#D3D3D3'}}>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Check-in</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Check-out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.checkin}</TableCell>
                <TableCell>{record.checkout}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
    
    
  );
};

export default AttendanceActivity;
