import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Link, Box,List,ListItem,Avatar,ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants'; 
import { useNavigate } from 'react-router-dom';


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
  const [holidays, setHolidays] = useState([]);
  const [onLeave, setOnLeave] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const fetchLeaveData = async () => {
    try {
      setLoading(true);
      const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      const response = await axios.get('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Leave/leave-balance', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'url': 'staging.stellarhrm.com',
        },
      });
      setLeaveData(response.data);
    } catch (error) {
      console.error("Failed to fetch leave balance:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      const response = await axios.get('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/PublicHoliday/list', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'url': 'staging.stellarhrm.com',
        },
      });
      setHolidays(response.data.rows||[]);
      console.log(holidays);
    } catch (error) {
      console.error("Failed to fetch Public Holidays:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchOnLeave = async () => {
    try {
      setLoading(true);
      const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      const response = await axios.get('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Leave/on_leave_today', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'url': 'staging.stellarhrm.com',
        },
      });
      setOnLeave(response.data.rows||[]);
      
    } catch (error) {
      console.error("Failed to fetch OnLeave:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnLeave();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6}>
        <StyledCard>
          <StyledCardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <CardHeader>Leave Balances</CardHeader>
              <Box display="flex" alignItems="center">
                <CardBody variant="body2">
                  <Link
                    onClick={() => navigate('/dashboard/new-leave-request')}
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
                        <TableCell>{leave.LeaveType?.leave_type_name}</TableCell>
                        <TableCell>{leave.total_leaves_count}</TableCell>
                        <TableCell>{leave.utilized_leaves_count}</TableCell>
                        <TableCell>{leave.available_leaves_count}</TableCell>
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
        <StyledCard>
          <StyledCardContent>
            <CardHeader>On Leave Today</CardHeader>
            <Box component="hr" sx={{ border: '1px solid #FFCC00', margin: '8px 0' }} />
            <List>
            {onLeave && onLeave.length > 0 ? (
              onLeave.map((employee) => (
                <ListItem key={employee.emp_code}>
                  <Avatar
                    sx={{ marginRight: '10px' }}
                    src={employee.profile_pic ? 'ALT_IMG' : ''}
                  />
                  <ListItemText primary={`${employee.fname} ${employee.lname} (${employee.emp_code}) is on leave today`} />
                </ListItem>
              ))
            ): (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                  No one is on leave
                </TableCell>
              </TableRow>
            )}
            </List>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <StyledCard>
          <StyledCardContent>
            <CardHeader>Upcoming Holidays</CardHeader>
            <Table>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>Loading...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>Error: {error}</TableCell>
                  </TableRow>
                ) : holidays.length > 0 ? (
                  holidays.map((holiday, index) => (
                    <TableRow key={index}>
                      <TableCell>{holiday.date}</TableCell>
                      <TableCell>{holiday.name}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>No Holidays Found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledCardContent>
        </StyledCard>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
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
