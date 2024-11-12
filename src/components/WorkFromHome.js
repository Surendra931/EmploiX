import React, { useState,useEffect } from 'react';

import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import '../css/adjust.css'
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const WorkFromHome = () => {
  const [workfromhomedata,setWorkFromHomeData]=useState([]);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  
 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
        const response = await axios.get(
          `https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/WorkFromHome/list`,
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              url: 'staging.stellarhrm.com',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWorkFromHomeData(response.data.rows ?? []);
      } catch (error) {
        console.error('Error Fetching Claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]);

  return (

    <div className='Leaves-random'>
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Work From Home Request</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/dashboard/new-work-from-home')}
              sx={{ backgroundColor: '#FFCC00', '&:hover': { backgroundColor: '#FFC300' } }}
            >
              Create
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#D3D3D3' }}>
                <TableRow>
                  <TableCell>From Date</TableCell>
                  <TableCell>TO Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {workfromhomedata.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No Data Found</TableCell>
                  </TableRow>
                ) : (
                  workfromhomedata.map((request, index) => (
                    <TableRow key={index}>
                      
                      <TableCell>{request.from_date}</TableCell>
                      <TableCell>{request.to_date}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.status}</TableCell>
                     
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    </Box>
    </div>
  );
};

export default WorkFromHome;
