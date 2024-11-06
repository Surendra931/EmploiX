import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
 

const NewAttendanceRequest = () => {
  const navigate = useNavigate();
  
  const [attendanceDate, setAttendanceDate] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    // Create a new attendance record object
    const newRecord = {
      date: attendanceDate ? attendanceDate.toLocaleDateString() : '',
      checkin: checkInTime ? checkInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      checkout: checkOutTime ? checkOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      reason,
      status: 'Pending',
    };

    // Normally, submit the newRecord to your backend or global state here

    // Navigate back to the attendance request list
    navigate('/attendance-request');
  };

  const handleCancel = () => {
    // Navigate back without saving
    navigate('/attendance-request');
  };

  return (
          
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#eaeaea', borderRadius: '8px' }}>
        <Typography variant="h6" mb={2}>New Attendance Request</Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Attendance Date"
            value={attendanceDate}
            onChange={(newValue) => setAttendanceDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
            sx={{
              '& .MuiSvgIcon-root': { color: 'blueviolet' },
            }}
          />
          <TimePicker
            label="Check-in Time"
            value={checkInTime}
            onChange={(newValue) => setCheckInTime(newValue)}
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
            sx={{
              '& .MuiSvgIcon-root': { color: 'blueviolet' },
            }}
          />
          <TimePicker
            label="Check-out Time"
            value={checkOutTime}
            onChange={(newValue) => setCheckOutTime(newValue)}
            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
            sx={{
              '& .MuiSvgIcon-root': { color: 'blueviolet' },
            }}
          />
          <TextField
            label="Reason"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </LocalizationProvider>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
            sx={{ mr: 1, borderColor: 'red', color: 'red' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleSubmit}
            sx={{ backgroundColor: '#FFCC00', '&:hover': { backgroundColor: '#FFCC00' } }}
          >
            Create
          </Button>
        </Box>
      </Box>
   
  );
};

export default NewAttendanceRequest;
