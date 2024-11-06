import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewClaimRequest from './NewClaimRequest';
import '../css/adjust.css'
 


const MyClaims = () => {
  const [showNewClaim, setShowNewClaim] = useState(false);
  const [claimsData, setClaimsData] = useState([]);
  const [activeStatus, setActiveStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);

  const handleCreateClaim = (newClaim) => {
    setClaimsData([...claimsData, newClaim]);
    setShowNewClaim(false); 
  };

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    
  };

  const filteredClaimsData = claimsData.filter(claim => {
    if (activeStatus === 'Pending') return claim.status === 'Pending';
    if (activeStatus === 'Approved') return claim.status === 'Approved';
    if (activeStatus === 'Cancelled') return claim.status === 'Cancelled';
    if (activeStatus === 'Rejected') return claim.status === 'Rejected';
    return true;
  });

 
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 200); 
  };

  React.useEffect(() => {
    simulateLoading(); 
  }, [activeStatus]);

  return (
  
    <div className='Claims-random'>
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      {!showNewClaim && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">Claims Request</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FFCC00' }}
            onClick={() => setShowNewClaim(true)}
            startIcon={<AddIcon />}
          >
            Create New
          </Button>
        </Box>
      )}

      {!showNewClaim && (
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          {['Pending', 'Approved', 'Cancelled', 'Rejected'].map((status) => (
            <Box
              key={status}
              onClick={() => handleStatusChange(status)}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                color: activeStatus === status ? '#FFCC00' : '#000',
                '&:after': activeStatus === status ? {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#FFCC00',
                } : {},
              }}
            >
              <Typography>{status}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Divider sx={{ backgroundColor: '#000', height: '3px', mb: 2 }} />

      {!showNewClaim && (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          {loading ? ( 
            <Skeleton animation="wave" height={200} />
          ) : (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F4F4F4' }}>
                  <TableCell sx={{fontWeight:600,color:'#000'}}>Claim Type</TableCell>
                  <TableCell sx={{fontWeight:600,color:'#000'}}>Date</TableCell>
                  <TableCell sx={{fontWeight:600,color:'#000'}}>Amount</TableCell>
                  <TableCell sx={{fontWeight:600,color:'#000'}}>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClaimsData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{fontWeight:600,color:'#000'}}>No data found !</TableCell>
                  </TableRow>
                ) : (
                  filteredClaimsData.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.claimType}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.amount}</TableCell>
                      <TableCell>{record.comments}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}

      {showNewClaim && (
        <NewClaimRequest onSubmit={handleCreateClaim} onCancel={() => setShowNewClaim(false)} />
      )}
    </Box>
    </div>
    
  );
};

export default MyClaims;
