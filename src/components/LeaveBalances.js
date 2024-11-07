import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Link, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'left',
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  width: '100%',  
}));

const StyledCardContent = styled(CardContent)({
  width: '100%',
});

const CardHeader = styled(Typography)({
  color: '#FFCC00',
  fontWeight: 600,
  fontSize: '1.25rem', 
});

const CardBody = styled(Typography)({
  fontWeight: 400,
});

const LeaveBalances = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchLeaveData = async () => {
  //     try {
  //       const response = await axios.get('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Leave/leave-balance', {
  //         method:'GET',
  //         headers: {
  //           accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'url':'staging.stellarhrm.com',
  //         },
  //       });
  //       setLeaveData(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchLeaveData();
  // }, []);

   
   const fetchLeaveData = async () => {
    try {
      setLoading(true);
      const token=getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      console.log(token)
      const response = await axios.get('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Leave/leave-balance', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}` ,
          'url':'staging.stellarhrm.com',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch leave balance:", error);
      throw error;
    }finally{
      setLoading(false);
    }
  };

    useEffect(()=>{
      fetchLeaveData();
    },[]);

  return (
    <Grid container spacing={3}>
      {/* Row 1 */}
      <Grid item xs={12} sm={6} md={6}>
        {/* Card A: Leave Balances */}
        <StyledCard>
          <StyledCardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <CardHeader>Leave Balances</CardHeader>
              <Box display="flex" alignItems="center">
                <CardBody variant="body2">
                  <Link
                    href="/apply-leave"
                    style={{
                      color: '#FFCC00',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '1.25rem',
                    }}
                  >
                    Apply Leave
                  </Link>
                </CardBody>
                <ChevronRightIcon style={{ color: '#FFCC00' }} />
              </Box>
            </Box>
            <Box sx={{ overflowY: 'auto', maxHeight: '120px' }}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#D3D3D3' }}>
                    <TableCell style={{ color: '#000000', fontWeight: 600 }}>Leave Type</TableCell>
                    <TableCell style={{ color: '#000000', fontWeight: 600 }}>Total Leaves</TableCell>
                    <TableCell style={{ color: '#000000', fontWeight: 600 }}>Utilized</TableCell>
                    <TableCell style={{ color: '#000000', fontWeight: 600 }}>Available</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: 'center' }}>Loading...</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: 'center' }}>Error: {error}</TableCell>
                    </TableRow>
                  ) : leaveData.length > 0 ? (
                    leaveData.map((leave, index) => (
                      <TableRow key={index}>
                        <TableCell>{leave.type}</TableCell>
                        <TableCell>{leave.total}</TableCell>
                        <TableCell>{leave.utilized}</TableCell>
                        <TableCell>{leave.available}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: 'center' }}>No Leaves Found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        {/* Card B: On Leave Today */}
        <StyledCard>
          <StyledCardContent>
            <CardHeader>On Leave Today</CardHeader>
            <Box component="hr" sx={{ border: '1px solid #FFCC00', margin: '8px 0' }} />
            <CardBody>No One on Leave</CardBody>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} sm={6} md={6}>
        {/* Card C: Upcoming Holidays */}
        <StyledCard>
          <StyledCardContent>
            <CardHeader>Upcoming Holidays</CardHeader>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontWeight: 400 }}>31/10/2024</TableCell>
                  <TableCell style={{ fontWeight: 400 }}>DIWALI</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 400 }}>25/12/2024</TableCell>
                  <TableCell style={{ fontWeight: 400 }}>CHRISTMAS</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        {/* Card D: Special Events */}
        <StyledCard>
          <StyledCardContent>
            <CardHeader>Special Events</CardHeader>
            <Box component="hr" sx={{ border: '1px solid #FFCC00', margin: '10px 0' }} />
            <CardBody>No Events Found</CardBody>
          </StyledCardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default LeaveBalances;
