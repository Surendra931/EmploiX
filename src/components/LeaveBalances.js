import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Link, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


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
                      fontSize: '1.25rem', // Match the font size with CardHeader
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
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: 'center' }}>No Leaves Found</TableCell>
                  </TableRow>
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
                {/* Add more holidays as needed */}
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
