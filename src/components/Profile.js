import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ProfilePic from '../assets/ProfilePic.jpg';
import { Box, Grid, Paper } from '@mui/material';


export default function Profiles() {
  const [profilePic, setProfilePic] = useState(ProfilePic);
  const [name, setName] = useState("Surendra Sriramula");
  const [userType] = useState("PT36X|Software Intern");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const items = [
    { label: 'First name', value: 'Surendra' },
    { label: 'Last name', value: 'Sriramula' },
    { label: 'Gender', value: 'Male' },
    { label: 'Email', value: 'surendrasriramula@gmail.com' },
    { label: 'Mobile number', value: '8297697638' },
    { label: 'Date of birth', value: '2000-12-11' },
    { label: 'Emergency contact', value: '8297697638' },
    { label: 'Contact name', value: 'SURENDRA' },
    { label: 'Emergency Contact Relation', value: 'Self' },
    { label: '', value: '' }, 
    { label: 'Permanent Address', value: 'NA' },
    { label: 'Present Address', value: 'NA' },
  ];

  const company_items = [
    { label: 'Employee Id', value: 'PT36X' },
    { label: 'Branch', value: '7' },
    { label: 'Department', value: '--' },
    { label: 'Designation', value: 'Software Intern' },
    { label: ' Role', value: 'Intern' },
    { label: 'Employement Type', value: 'Contractor' },
    { label: 'Shift', value: '--' },
    { label: 'Date Of Joining', value: '03/10/2024' },
    { label: 'Reporting Manager', value: '--' },

  ];

  const bank_items = [
    { label: 'Bank Name', value: 'SBI' },
    { label: 'Account Type', value: 'Savings' },
    { label: 'Beneficiary Name', value: 'Surendra Sriramula' },
    { label: 'Accuont Number', value: '37140844474' },
    { label: ' IFSC Code', value: 'SBIN0021280' },

  ];
  return (
    
    <div style={{ backgroundColor: '#F4F4F4', padding: '16px' }}>
      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center" 
        sx={{ width: '100%'}} 
      >
        <div style={{ position: 'relative' }}>
          <Avatar alt="Employee" sx={{ width: 75, height: 75 }} src={profilePic} />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <IconButton
              component="span"
              sx={{
                position: 'absolute',
                bottom: -5,
                right: -5,
                backgroundColor: '#FFCC00',
                borderRadius: '50%',
                boxShadow: 1,
                width: 30,
                height: 30,
                '&:hover': {
                  backgroundColor: '#FFCC00',
                },
              }}
            >
              <CameraAltIcon sx={{ color: 'black', fontSize: 18 }} />
            </IconButton>
          </label>
        </div>
        <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold">{name}</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={700}>
            {userType}
          </Typography>
        </Stack>
      </Stack>
      <hr style={{ border: '1px solid #ccc', margin: '16px 0' }} />

      <Paper elevation={1} sx={{ borderRadius: 2, padding: 2,backgroundColor:'#f4f4f4' }}>
        <Typography variant="h6" fontWeight={"bold"} sx={{ marginBottom: 2 }}>
          Personal Information
        </Typography>
        <Box>
          <Grid container spacing={3}>
            {/* Render the first 9 items */}
            {items.slice(0, 9).map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    backgroundColor: 'white', 
                    borderRadius: 3, 
                    padding: 2,  
                  }}
                >
                  <Typography variant="body2" fontWeight="500" color='grey'>{item.label}</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{item.value}</Typography>
                </Box>
              </Grid>
            ))}
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ backgroundColor: 'white', borderRadius: 1, padding: 2, border: '3px', display: 'none' }}>
                <Typography variant="body2" fontWeight="500"></Typography>
                <Typography variant="body2"></Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: '16px' }}>
            {/* Displaying the last two items in the same row */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2, }}>
              <Typography variant="body2" fontWeight="500" color='grey'>{items[10].label}</Typography>
              <Typography variant="body2" fontWeight={"700"}>{items[10].value}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2,  }}>
              <Typography variant="body2" fontWeight="500" color='grey'>{items[11].label}</Typography>
              <Typography variant="body2" fontWeight={"700"}>{items[11].value}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
            {/* Company info */}
      <Paper elevation={1} sx={{ borderRadius: 2, padding: 2,marginTop:'10px',backgroundColor:'#f4f4f4' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Company Info
        </Typography>
        <Box>
          <Grid container spacing={3}>
            
            {company_items.slice(0, 9).map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    backgroundColor: 'white', 
                    borderRadius: 3, 
                    padding: 2,  
                  }}
                >
                  <Typography variant="body2" fontWeight="500" color='grey'>{item.label}</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{item.value}</Typography>
                </Box>
              </Grid>
            ))}
            </Grid>
        </Box>
      </Paper>

      {/* bank info */}
      <Paper elevation={1} sx={{ borderRadius: 2, padding: 2,marginTop:'10px',backgroundColor:'#f4f4f4' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Bank  Details
        </Typography>
        <Box>
          <Grid container spacing={3}>
            {bank_items.slice(0,5).map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    backgroundColor: 'white', 
                    borderRadius: 3, 
                    padding: 2,  
                  }}
                >
                  <Typography variant="body2" fontWeight="500" color='grey'>{item.label}</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{item.value}</Typography>
                </Box>
              </Grid>
            ))}
            </Grid>
        </Box>
      </Paper>
    </div>
    
  );
}
