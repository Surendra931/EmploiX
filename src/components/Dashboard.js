import * as React from 'react';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import DatasetIcon from '@mui/icons-material/Dataset';
import CancelIcon from '@mui/icons-material/Cancel';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PeopleIcon from '@mui/icons-material/People';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <GroupsIcon />,
  },
  {
    segment: 'attendance',
    title: 'Attendance',
    icon: <DatasetIcon />,
    children: [
      {
        segment: 'attendance-activity',
        title: 'Attendance Activity',
      },
      {
        segment: 'attendance-request',
        title: 'Attendance Request',
      },
    ],
  },
  {
    segment: 'leaverequest',
    title: 'Leave request',
    icon: <CancelIcon />,
  },
  {
    segment: 'myclaims',
    title: 'My Claims',
    icon: <CreditScoreIcon />,
  },
  {
    segment: 'mypeople',
    title: 'My People',
    icon: <PeopleIcon />,
  },
  {
    segment: 'workfromhome',
    title: 'My Work From Home',
    icon: <HouseOutlinedIcon />,
  },
  {
    segment: 'mypayslips',
    title: 'My Payslips',
    icon: <PaymentsOutlinedIcon />,
  },
  {
    segment: 'resignation',
    title: 'Resignation',
    icon: <PersonRemoveOutlinedIcon />,
  },
  {
    segment: 'holidays',
    title: 'Holidays',
    icon: <HolidayVillageIcon />,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}



export default function Dashboard(props) {
  const { window } = props;

  const [checkIn, setCheckIn] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const router = useDemoRouter('/dashboard2');
  const demoWindow = window ? window() : undefined;

  const handleCheckInOut = () => {
    setCheckIn(!checkIn);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const currentTime = new Date().toLocaleTimeString();

  const currentSegmentTitle = NAVIGATION.find(
    (navItem) => navItem.segment === router.pathname.substring(1)
  )?.title || 'Dashboard';

  return (
    <ThemeProvider theme={theme}>
      <AppProvider navigation={NAVIGATION} router={router} theme={theme} window={demoWindow}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {currentSegmentTitle}
            </Typography>
            <Button variant="contained" color={checkIn ? 'secondary' : 'primary'} onClick={handleCheckInOut}>
              {checkIn ? `Checkout` : `Checkin: ${currentTime}`}
            </Button>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
              <Avatar />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <DashboardLayout>
          <PageContainer>
            
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

