import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const ChangePassword = () => {
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [message, setMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('mockCurrentPassword'); // Replace with actual password handling logic

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (oldPasswordInput !== currentPassword) {
      setMessage("Current password is incorrect");
      return;
    }

    // Check if new passwords match
    if (newPasswordInput !== confirmPasswordInput) {
      setMessage("New passwords don't match");
      return;
    }

    // Simulate password change by updating the currentPassword state
    setCurrentPassword(newPasswordInput);
    setMessage("Password changed successfully!");

    // Clear the form
    setOldPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          padding: 3,
          marginTop: 20,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Current Password"
            type="password"
            variant="outlined"
            value={oldPasswordInput}
            onChange={(e) => setOldPasswordInput(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            variant="outlined"
            value={newPasswordInput}
            onChange={(e) => setNewPasswordInput(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm New Password"
            type="password"
            variant="outlined"
            value={confirmPasswordInput}
            onChange={(e) => setConfirmPasswordInput(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#FFCC00', 
              color: '#000', 
              '&:hover': {
                backgroundColor: '#FFCC00', 
              },
            }}
            fullWidth
          >
            Change Password
          </Button>
          {message && (
            <Typography
              color={message.includes("successfully") ? "success.main" : "error.main"}
              mt={2}
            >
              {message}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;
