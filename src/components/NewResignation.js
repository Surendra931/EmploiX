import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tooltip,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
 


const NewResignation = ({ onSubmit, onCancel }) => {
  const [ResigningDate, setResigningDate] = useState(null);
  const [reason, setReason] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = () => {
    const newRequest = {
      date: ResigningDate ? ResigningDate.toLocaleDateString() : '',
      reason,
    };

    onSubmit(newRequest);
  };

  return (
    
    <Box sx={{ mt: 3, p: 2, backgroundColor: '#eaeaea' }}>
      <Typography variant="h6" mb={2}>Resignation Request</Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={ResigningDate}
          onChange={(newValue) => setResigningDate(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              fullWidth
              error={false}
              sx={{
                marginBottom: '20px', // Explicit spacing added here
                '& .MuiSvgIcon-root': { color: 'blueviolet' },
              }}
            />
          )}
        />
      </LocalizationProvider>

      <TextField
        label="Reason"
        multiline
        rows={3}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        fullWidth
        sx={{
          marginBottom: '16px', // Adjust this value for more spacing if needed
        }}
      />

      <Typography variant="body1" mb={1}>Attach Documents:</Typography>
      <label htmlFor="upload-file" style={{ cursor: 'pointer' }}>
        <Button
          variant="contained"
          component="span"
          sx={{ backgroundColor: '#FFCC00', color: '#000', mb: 1 }}
        >
          Upload Files
        </Button>
      </label>
      <input
        id="upload-file"
        type="file"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      {uploadedFile && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2">{uploadedFile.name}</Typography>
          <Tooltip title="Delete">
            <Button onClick={handleDeleteFile} sx={{ marginLeft: 1 }}>
              <DeleteIcon sx={{ color: '#000' }} />
            </Button>
          </Tooltip>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{ color: 'red', borderColor: 'red', mr: 1 }}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#FFCC00', '&:hover': { backgroundColor: '#FFCC00' } }}
          startIcon={<CheckIcon />}
        >
          Create
        </Button>
      </Box>
    </Box>
    
  );
};

export default NewResignation;
