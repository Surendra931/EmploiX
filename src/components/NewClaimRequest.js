import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tooltip,
} from '@mui/material';
import { MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
 



const NewClaimRequest = ({ onSubmit, onCancel }) => {
  const [claimType, setClaimType] = useState('');
  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');
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
    const newClaim = {
      claimType,
      date: new Date().toLocaleDateString(),
      amount,
      comments,
      status: 'Pending', 
    };

    onSubmit(newClaim);
  };

  return (

    <Box sx={{ mt: 3, p: 2, backgroundColor: '#eaeaea' }}>
      <Typography variant="h6" mb={2}>New Claim Request</Typography>

      <TextField
        select
        label="Claim Type"
        value={claimType}
        onChange={(e) => setClaimType(e.target.value)}
        sx={{ mb: 2, width: '200px',paddingRight:'10px' ,
            '& .MuiSvgIcon-root': { color: 'blueviolet' }, 
          }}
      >
        <MenuItem value="Medical">Medical</MenuItem>
        <MenuItem value="Travel">Travel</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField
        label="₹Amount"
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        startIcon={CurrencyRupeeIcon}
        sx={{ mb: 4, width: '200px' ,
          '& .MuiSvgIcon-root': { color: 'blueviolet' }, 
        }}
      />

      <TextField
        label="Comments"
        multiline
        rows={4}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        fullWidth
        sx={{ mb: 2 ,
          '& .MuiSvgIcon-root': { color: 'blueviolet' }, 
        }}
      />

      <Typography variant="body1" mb={1}>Attach Documents:</Typography>
      <label htmlFor="upload-file" style={{ cursor: 'pointer' }}>
        <Button
          variant="contained"
          component="span"
          sx={{ backgroundColor: '#FFCC00', color: '#000', mb: 1  }}
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
            <Button onClick={handleDeleteFile} sx={{ marginLeft: 1, }}>
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

export default NewClaimRequest;
