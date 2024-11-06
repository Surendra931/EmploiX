import React, { useState } from 'react';
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
import NewWorkFromHomeRequest from './NewWorkFromHomeRequest';
import '../css/adjust.css'

const WorkFromHome = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const handleCreateWorkFromHomeRequest = (newRequest) => {
    setLeaveRequests([...leaveRequests, newRequest]);
    setShowNewRequest(false);
  };

  const handleCancel = () => {
    setShowNewRequest(false);
  };

  return (

    <div className='Leaves-random'>
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      {!showNewRequest ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Work From Home Request</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowNewRequest(true)}
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
                {leaveRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No Data Found</TableCell>
                  </TableRow>
                ) : (
                  leaveRequests.map((request, index) => (
                    <TableRow key={index}>
                      
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.status}</TableCell>
                     
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <NewWorkFromHomeRequest
          onSubmit={handleCreateWorkFromHomeRequest}
          onCancel={handleCancel}
        />
      )}
    </Box>
    </div>
  );
};

export default WorkFromHome;
