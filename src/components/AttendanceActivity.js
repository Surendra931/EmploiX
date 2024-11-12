import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';
import '../css/adjust.css';

const AttendanceActivity = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);

  // Helper function to format the date to the required month and year
  const formatMonthYear = (date) => {
    return {
      month: date.getMonth() + 1, // months are 0-based in JavaScript
      year: date.getFullYear(),
    };
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12 for 12 AM
  
    // Format minutes with leading zero if less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${formattedMinutes} ${period}`;
  };
  

  // Fetch attendance data based on month and year
  const fetchAttendanceData = async (fromMonth, fromYear, toMonth, toYear) => {
    try {
      const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      const response = await axios.get(
        `https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Attendance/swipeinfo?from_month=${fromMonth}&from_year=${fromYear}&to_month=${toMonth}&to_year=${toYear}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            url: 'staging.stellarhrm.com',
          },
        }
      );
      setAttendanceData(response.data.rows || []);
    } catch (error) {
      console.error('Failed to fetch Attendance Data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    // Get current month and year
    const currentDate = new Date();
    const { month, year } = formatMonthYear(currentDate);

    // Fetch data for current month and year by default
    fetchAttendanceData(month, year, month, year);
  }, []);

  // Handle date change by the user
  useEffect(() => {
    if (fromDate && toDate) {
      const fromMonth = fromDate.getMonth() + 1;
      const fromYear = fromDate.getFullYear();
      const toMonth = toDate.getMonth() + 1;
      const toYear = toDate.getFullYear();

      fetchAttendanceData(fromMonth, fromYear, toMonth, toYear);
    }
  }, [fromDate, toDate]);

  return (
    <div className="Attendance-random">
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
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
                  '& .MuiSvgIcon-root': { color: 'blueviolet' },
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

        {error && <Typography color="error">{error}</Typography>}

        <TableContainer component={Paper} sx={{ mt: 2, width: '100%' }}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#D3D3D3' }}>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Check-in</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Check-out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{formatTime(record.check_in_time)}</TableCell>
                  <TableCell>{formatTime(record.check_out_time)}</TableCell>
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
