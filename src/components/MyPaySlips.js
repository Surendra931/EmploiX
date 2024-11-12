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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../css/adjust.css';
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';

const MyPaySlips = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [paySlipsData, setPaySlipsData] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
        const response = await axios.get(
          'https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api//Payslip/employees/list',
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token}`,
              url: 'staging.stellarhrm.com',
            },
          }
        );
        setPaySlipsData(response.data);
      } catch (error) {
        console.error("Failed to fetch pay slips data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on selected month and year
  const filteredData = paySlipsData.filter((payslip) => {
    if (!selectedDate) return true;
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();
    return payslip.month === selectedMonth && payslip.year === selectedYear;
  });

  return (
    <div className="MyPaySlips-random">
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            PaySlips
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Select Month and Year"
                views={['year', 'month']}
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
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
            <TableHead>
              <TableRow sx={{ backgroundColor: '#D3D3D3' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Month</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.month}</TableCell>
                    <TableCell>{request.year}</TableCell>
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

export default MyPaySlips;
