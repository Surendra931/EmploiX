import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const NewLeaveRequest = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false); 
  const [leaveRequests, setLeaveRequests] = useState([]);

  const navigate=useNavigate();
  
  const handleSubmit = async () => {
    
    const newRequest = {
      leave_id: leaveType,
      from_date: startDate,
      to_date: endDate,
      reason: reason,
    };

    try {
      setLoading(true); 
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
      navigate('/dashboard/leave-request')
      // onSubmit(response.data);
    } catch (error) {
      
      console.error('Error submitting leave request:', error);
      alert('There was an error submitting your leave request. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const fetchLeavesData = async () => {
      try {
        const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
        const response = await axios.get(
          'https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Leave/my-leaves',
          { 
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'url':'staging.stellarhrm.com',
            'Authorization': `Bearer ${token}` 
            } }
        );
        //const data=await response.json();
        setLeaveRequests(response.data.rows??[]);
        console.log(response);

      } catch (error) {
        console.error('Error Fetching Leaves:', error);
      }
    };

    fetchLeavesData();
  }, []);

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
            {leaveRequests?.map((request) => (
            <MenuItem key={request.leave_id} value={request.leave_id}>
              {request.leave_type}
            </MenuItem>
          ))}
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
            onClick={() => navigate('/dashboard/leave-request')}
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
            disabled={loading} 
          >
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NewLeaveRequest;
