import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  
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


const NewWorkFromHomeRequest = ({ onSubmit, onCancel }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newRequest = {
      from_date: startDate,
      to_date: endDate,
      reason: reason,
    };

    try {
      const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      const response = await axios.post(
        'https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/WorkFromHome/create',
        newRequest,
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'url': 'staging.stellarhrm.com',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      navigate('/dashboard/workfromhome');
    } catch (error) {
      console.error('Error submitting Work From Request:', error);
      alert('There was an error submitting your Work From Home Request. Please try again.');
    }
  };

  return (
    <Box sx={{ mt: 3, p: 2, backgroundColor: '#eaeaea', borderRadius: '8px' }}>
      <Typography variant="h6" mb={2}>Apply Work From Home</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
            sx={{
              '& .MuiSvgIcon-root': { color: 'blueviolet' },
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
            sx={{
              '& .MuiSvgIcon-root': { color: 'blueviolet' },
            }}
          />
        </LocalizationProvider>
      </Box>

      <TextField
        label="Reason"
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
          onClick={() => navigate('/dashboard/workfromhome')}
          sx={{ color: 'red', borderColor: 'red', mr: 1 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<CheckIcon />}
          onClick={handleSubmit}
          sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default NewWorkFromHomeRequest;