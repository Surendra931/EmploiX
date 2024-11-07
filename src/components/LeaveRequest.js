import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/adjust.css';
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchLeavesData = async () => {
      try {
        const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
        const response = await axios.get(
          'https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/LeaveType/list',
          { 
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'url':'staging.stellarhrm.com',
            'Authorization': `Bearer ${token}` 
            } }
        );
        // const data = await response.json();
        setLeaveRequests(response.data.rows??[]);
        console.log(response);

      } catch (error) {
        console.error('Error Fetching Leaves:', error);
      }
    };

    fetchLeavesData();
  }, []);

  return (
    <div className="Leaves-random">
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Leave Requests</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/dashboard/new-leave-request')} 
            sx={{ backgroundColor: '#FFCC00', '&:hover': { backgroundColor: '#FFC300' } }}
          >
            Create
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#D3D3D3' }}>
              <TableRow>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Requested Dates</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No Data Found</TableCell>
                </TableRow>
              ) : (
                leaveRequests?.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.leave_type_name}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>{request.leave_days}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default LeaveRequests;
