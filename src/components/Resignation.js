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
import NewResignation from './NewResignation';
import '../css/adjust.css'


const Resignation = () => {
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
              <Typography variant="h6" fontWeight="bold">Resignation</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowNewRequest(true)}
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
                        <TableCell>{request.noticeperiod}</TableCell>
                        <TableCell>{request.personalemailidx``}</TableCell>
                        <TableCell>{request.status}</TableCell>
                      
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <NewResignation
            onSubmit={handleCreateWorkFromHomeRequest}
            onCancel={handleCancel}
          />
        )}
      </Box>
      </div>
    
  );
};

export default Resignation;
