import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import '../css/adjust.css';
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';

const MyClaims = () => {
  const [claimsData, setClaimsData] = useState([]);
  const [activeStatus, setActiveStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);
  const [claimStatus, setClaimStatus] = useState(null);

  const navigate = useNavigate();

  const handleStatusChange = (status) => {
    setActiveStatus(status);
  };

  const filteredClaimsData = claimsData.filter((claim) => {
    return claim.status === activeStatus;
  });

  useEffect(() => {
    const fetchClaimType = async () => {
      try {
        const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
        const response = await axios.get(
          'https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Claim/list',
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              url: 'staging.stellarhrm.com',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const claimTypes = response.data.rows ?? [];
        if (claimTypes.length > 0) {
          setClaimStatus(claimTypes[0].status);
        }
      } catch (error) {
        console.error('Error Fetching ClaimType:', error);
      }
    };

    fetchClaimType();
  }, []);

  useEffect(() => {
    const fetchClaimsData = async () => {
      setLoading(true);
      try {
        const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
        const response = await axios.get(
          `https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Claim/list?status=${activeStatus}`,
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              url: 'staging.stellarhrm.com',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClaimsData(response.data.rows ?? []);
      } catch (error) {
        console.error('Error Fetching Claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaimsData();
  }, [activeStatus]); 

  return (
    <div className="Claims-random">
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Claims Request
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FFCC00' }}
            onClick={() => navigate('/dashboard/new-claims')}
            startIcon={<AddIcon />}
          >
            Create New
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, mb: 1 }}>
          {['Pending', 'Approved', 'Cancelled', 'Rejected'].map((status) => (
            <Box
              key={status}
              onClick={() => handleStatusChange(status)}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                color: activeStatus === status ? '#FFCC00' : '#000',
                '&:after': activeStatus === status
                  ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: '#FFCC00',
                      fontWeight:'bold',
                    }
                  : {},
              }}
            >
              <Typography>{status}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ backgroundColor: '#F4F4F4', height: '3px', mb: 2 }} />

        <TableContainer component={Paper} sx={{ mt: 1 }}>
          {loading ? (
            <Skeleton animation="wave" height={200} />
          ) : (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F4F4F4' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#000' }}>Claim Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#000' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#000' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#000' }}>Comments</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClaimsData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ fontWeight: 600, color: '#000' }}>
                      No data found!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClaimsData?.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>{request.ClaimType?.name}</TableCell>
                      <TableCell>{request.claimed_date}</TableCell>
                      <TableCell>{request.amount}</TableCell>
                      <TableCell>{request.comments}</TableCell>
                      
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </div>
  );
};

export default MyClaims;
