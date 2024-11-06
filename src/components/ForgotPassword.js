// ForgotPasswordPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    // Logic to send email goes here
    console.log('Email sent to:', email);
    // Optionally, navigate to a confirmation page or display a success message
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
          Forgot Password
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FFCC00', // Set button color to #FFCC00
            color: '#000', // Set text color to black (or adjust as needed)
            '&:hover': {
              backgroundColor: '#FFCC00', // Optional: Darken button on hover
            },
          }}
          fullWidth
          onClick={handleSendEmail}
        >
          Send Email Link
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
