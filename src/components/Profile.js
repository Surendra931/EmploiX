import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ProfilePic from '../assets/ProfilePic.jpg';
import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios'; 
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants'; 

export default function Profiles() {
  const [profilePic, setProfilePic] = useState(ProfilePic);
  const [name, setName] = useState("Surendra Sriramula");
  const [userType, setUserType] = useState("PT36X|Software Intern");
  const [loading,setLoading]=useState(false);
  const [items, setItems] = useState([]);  // For personal information
  const [companyItems, setCompanyItems] = useState([]);  // For company information
  const [bankItems, setBankItems] = useState([]);  // For bank details
  const [profileData,setProfileData]=useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    // Define an async function to fetch the profile data
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
        const response = await axios.get('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Employee/profile', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'url': 'staging.stellarhrm.com',
          },
      });
        setProfileData(response.data);
        // setProfilePic(profileData.profilePic);
        // setName(profileData.fname);
        // setUserType(profileData.role);

        
        setItems(profileData.Employee);
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []); 

 
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
  // console.log(profileData);
  return (
    <div style={{ backgroundColor: '#F4F4F4', padding: '16px' }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <div style={{ position: 'relative' }}>
          <Avatar alt="Employee" sx={{ width: 75, height: 75 }} src={profileData.profile_pic} />
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
          <Typography variant="h6" fontWeight="bold">{profileData?.Employee?.fname}{profileData?.Employee?.lname}</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={700}>
            {profileData?.username}|{profileData?.Designation?.designation_name}
          </Typography>
        </Stack>
      </Stack>
      <hr style={{ border: '1px solid #ccc', margin: '16px 0' }} />

      {/* Personal Information */}
      <Paper elevation={1} sx={{ borderRadius: 2, padding: 2, backgroundColor: '#f4f4f4' }}>
        <Typography variant="h6" fontWeight={"bold"} sx={{ marginBottom: 2 }}>
          Personal Information
        </Typography>
        <Box>
          <Grid container spacing={3}>
            
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>First Name</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.fname}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Last Name</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.lname}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Gender</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.gender}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Email</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.email_id}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Mobile Number</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.phone_no}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>DOB</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.dob}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Emergency Contact</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.local_contact_ph}</Typography>
                </Box>
              </Grid>
                
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'> Contact Name</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.local_contact_name}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Contact Realation</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.local_contact_relationship}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={6} lg={12}>
              </Grid>
              <Grid item xs={12}  md={6} lg={6}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Permanent Address</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.permanent_address}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={6} lg={6}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Present Address</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.present_address}</Typography>
                </Box>
              </Grid>
              </Grid>
          
          {/* <Grid container spacing={3} style={{ marginTop: '16px' }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                <Typography variant="body2" fontWeight="500" color='grey'>{items[10]?.label}</Typography>
                <Typography variant="body2" fontWeight={"700"}>{items[10]?.value}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                <Typography variant="body2" fontWeight="500" color='grey'>{items[11]?.label}</Typography>
                <Typography variant="body2" fontWeight={"700"}>{items[11]?.value}</Typography>
              </Box>
            </Grid>
          </Grid> */}
        </Box>
      </Paper>

      {/* Company Info */}
      <Paper elevation={1} sx={{ borderRadius: 2, padding: 2, marginTop: '10px', backgroundColor: '#f4f4f4' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Company Info
        </Typography>
        <Box>
          <Grid container spacing={3}>
              <Grid item xs={12}  md={3} lg={3}>
                      <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                        <Typography variant="body2" fontWeight="500" color='grey'>Employee Id</Typography>
                        <Typography variant="body2" fontWeight={"700"}>{profileData?.username}</Typography>
                    </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                  <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                    <Typography variant="body2" fontWeight="500" color='grey'>Branch</Typography>
                    <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.branch_code}</Typography>
                  </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Department</Typography>
                  {/* <Typography variant="body2" fontWeight={"700"}>{/*profileData?.Employee?.department_name}</Typography> */}
                  <Typography variant="body2" fontWeight={"700"}>--</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Designation</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Designation?.designation_name}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Role</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Role?.role_name}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Employment Type</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.employment_type}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Shift</Typography>
                  <Typography variant="body2" fontWeight={"700"}>--</Typography>
                </Box>
              </Grid>
                
              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Date of Joining</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.date_of_joining}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Reporting Manager</Typography>
                  <Typography variant="body2" fontWeight={"700"}>--</Typography>
                  {/* {profileData?.Employee?.reporting_manager} */}
                </Box>
              </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Bank Info */}
      <Paper elevation={1} sx={{ borderRadius: 2, padding: 2, marginTop: '10px', backgroundColor: '#f4f4f4' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Bank Details
        </Typography>
        <Box>
          <Grid container spacing={3}>
            {/* {bankItems.slice(0, 5).map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>{item.label}</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{item.value}</Typography>
                </Box>
              </Grid>
            ))} */}

              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Bank Name</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.bank_name}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Account Type</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.account_type}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Beneficiary Name</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.beneficiary_name}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>Account Number</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.account_number}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}  md={3} lg={3}>
                <Box sx={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Typography variant="body2" fontWeight="500" color='grey'>IFSC Code</Typography>
                  <Typography variant="body2" fontWeight={"700"}>{profileData?.Employee?.ifsc_code}</Typography>
                </Box>
              </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
