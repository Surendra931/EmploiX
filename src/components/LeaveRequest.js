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
import NewLeaveRequest from './NewLeaveRequest';
import '../css/adjust.css'
 


const LeaveRequests = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const handleCreateLeaveRequest = (newRequest) => {
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
            <Typography variant="h6" fontWeight="bold">Leave Requests</Typography>
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
                  leaveRequests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>{request.leaveType}</TableCell>
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>{request.requestedDates}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <NewLeaveRequest
          onSubmit={handleCreateLeaveRequest}
          onCancel={handleCancel}
        />
      )}
    </Box>
    </div>
  );
};

export default LeaveRequests;
