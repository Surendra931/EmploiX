import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import LeftImg from '../assets/YellowDot.svg';
import LoginImg from '../assets/LoginPageImg.svg';
import LoginLogo from '../assets/LoginText.svg';

//import ForgotPassword from './ForgotPassword'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Employee/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'url':'staging.stellarhrm.com',
        },
        body: JSON.stringify({
          username: username,
          password: password, 
        }),
      });
  
      const data = await response.json();
      //console.log(data); 
  
      if (response.ok) {
        navigate('/leave-balance', { state: { username, name: data.name } });
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };///API


  // const handleForgotPasswordOpen = () => {
  //   setIsForgotPasswordOpen(true);
  // };

  // const handleForgotPasswordClose = () => {
  //   setIsForgotPasswordOpen(false);
  // };

 

  return (
    <Grid container className="root">
      <Grid item className="leftSection">
        <img src={LeftImg} alt="Top Left" className="topImage" />
        <Box className="textContainer">
          <Typography className="signin">Sign In To</Typography>
          <Box className="textDivider">
            <Typography className="text">Monitor</Typography>
            <Box className='divide'></Box>
            <Typography className="text">Access</Typography>
            <Box className='divide'></Box>
            <Typography className="text">Assign</Typography>
          </Box>
        </Box>
        <img src={LoginImg} alt="Bottom" className="bottomImage" />
      </Grid>

      <Grid item className="rightSection">
        <Box className="formContainer">
          <img src={LoginLogo} alt="Logo" className="loginLogo" />
          <Typography variant="h5" className="signInText">Login</Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2">{error}</Typography>
          )}

          <Box display="flex" justifyContent="flex-end" mt={1} marginBottom={1} className="forgotPasswordLink">
            <Link onClick={() => navigate('/forgot-password')} underline="none" style={{ cursor: 'pointer' }}>Forgot password?</Link>
          </Box>
          <Button
            variant="contained"
            fullWidth
            size="medium"
            className="loginButton"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Grid>
      {/* <ForgotPassword open={isForgotPasswordOpen} onClose={handleForgotPasswordClose} /> */}
    </Grid>
  );
};

export default Login;
