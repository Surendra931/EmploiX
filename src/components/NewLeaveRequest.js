import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';

const NewLeaveRequest = ({ onSubmit, onCancel }) => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async () => {
    // Prepare request data
    const newRequest = {
      // leave_id: 0, 
      // from_date: startDate ? startDate.toISOString().split('T')[0] : '', // Convert date to string
      // to_date: endDate ? endDate.toISOString().split('T')[0] : '', // Convert date to string
      // reason,
      // document_file_name: '', // Optional, depending on your requirements
      // document_file_path: '', // Optional, depending on your requirements
      leave_type_name: leaveType,
      leave_days: 2,
      paid: 0,
      attachment: 1
    };

    try {
      setLoading(true); // Set loading state to true while making the API call
      const token=getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      const response = await axios.post(
        'https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Leave/create',
        newRequest,
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'url':'staging.stellarhrm.com',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Handle success
      console.log(response.data);
      // Optionally pass response data back to parent if necessary
      onSubmit(response.data);
    } catch (error) {
      // Handle error
      console.error('Error submitting leave request:', error);
      alert('There was an error submitting your leave request. Please try again.');
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };

  return (
    <>
      {/* <EmployeeDashboard /> */}
    
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#eaeaea', borderRadius: '8px' }}>
        <Typography variant="h6" mb={2}>Apply Leave</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            select
            label="Leave Type"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            sx={{ width: '200px', '& .MuiSvgIcon-root': { color: 'blueviolet' }}}
          >
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
            <MenuItem value="Casual Leave">Casual Leave</MenuItem>
            <MenuItem value="Earned Leave">Earned Leave</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
              sx={{ '& .MuiSvgIcon-root': { color: 'blueviolet' }}}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
              sx={{ '& .MuiSvgIcon-root': { color: 'blueviolet' }}}
            />
          </LocalizationProvider>
        </Box>

        <TextField
          label="Description"
          multiline
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={onCancel}
            sx={{ color: 'red', borderColor: 'red', mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45A049' },
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NewLeaveRequest;
