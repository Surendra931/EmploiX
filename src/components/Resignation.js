import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
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
import '../css/adjust.css'
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';

const Resignation = () => {
  
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [resignData,setResignData]=useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const fetchResignationData = async () => {
    try {
      setLoading(true);
      const token=getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      
      const response = await axios.get('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Resignation/list',
      {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` ,
          'url':'staging.stellarhrm.com',
        },
      });
      setResignData( response.data.rows??[]);
    } catch (error) {
      console.error("Failed to fetch leave balance:", error);
      throw error;
    }finally{
      setLoading(false);
    }
  };

    useEffect(()=>{
      fetchResignationData();
    },[]);

  return (

      <div className='Resign-random'>
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
       
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">Resignation</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/dashboard/new-resignation')}
                sx={{ backgroundColor: '#FFCC00', '&:hover': { backgroundColor: '#FFC300' } }}
              >
                Create Resignation
              </Button>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#D3D3D3' }}>
                  <TableRow>
                    <TableCell>Resign Date</TableCell>
                    <TableCell>Last working Date</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Notice Period</TableCell>
                    <TableCell>Personal EmailId</TableCell>
                    <TableCell>Status</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resignData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No Data Found</TableCell>
                    </TableRow>
                  ) : (
                    resignData.map((request, index) => (
                      <TableRow key={index}>
                        
                        <TableCell>{request.submission_date}</TableCell>
                        <TableCell>{request.last_working_date}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>{request.notice_period_days}</TableCell>
                        <TableCell>{request.personal_email_id}</TableCell>
                        <TableCell>{request.status}</TableCell>
                      
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        {/* ) : (
          <NewResignation
            onSubmit={handleCreateWorkFromHomeRequest}
            onCancel={handleCancel}
          /> */}
        
      </Box>
      </div>
    
  );
};

export default Resignation;
