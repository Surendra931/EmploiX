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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../css/adjust.css';
 
const MyPaySlips = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const PaySlipsData = []; 
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
              {PaySlipsData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                PaySlipsData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>{record.year}</TableCell>
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
