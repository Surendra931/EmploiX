import React, { useState, useEffect } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  Button,
  Collapse,
  Grid,
  TextField,
  Popover,
  Box,
} from '@mui/material';
import XIcon from '@mui/icons-material/X';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import DatasetIcon from '@mui/icons-material/Dataset';
import CancelIcon from '@mui/icons-material/Cancel';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PeopleIcon from '@mui/icons-material/People';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { AccountCircle, ExpandLess, ExpandMore, } from '@mui/icons-material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useMediaQuery } from '@mui/material';
import { Outlet,useNavigate} from 'react-router-dom';
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';

const drawerWidth = 240;
const collapsedWidth = 80;

const EmployeeDashboard = () => {

  const navigate=useNavigate();

  const userDetails=JSON.parse(getFromLocalStorage(STOREAGE_KEYS.USER_DETAILS));
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSubIndex,setSelectedSubIndex]=useState(-1);
  const [checkedIn, setCheckedIn] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [checkInTime, setCheckInTime] = useState('');
  const [hovered, setHovered] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (index,subIndex=-1) => {
    setSelectedIndex(index);
    setSelectedSubIndex(subIndex);
    if (index !== 2) { setAttendanceOpen(false); setSelectedSubIndex(-1); }

    renderContent(index,subIndex);
  };

  const handleCheckInOut = () => {
    if (checkedIn) {
      setCheckedIn(false);
      setCheckInTime('');
    } else {
      setCheckedIn(true);
      setCheckInTime(currentTime);
    }
  };

  const handleLogout=()=>{
    navigate('/')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkedIn) {
        setCurrentTime(new Date().toLocaleTimeString());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [checkedIn]);

  const toggleAttendance = () => {
    setAttendanceOpen(!attendanceOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);
  const id = isPopoverOpen ? 'simple-popover' : undefined;

  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const isNotificationPopoverOpen = Boolean(notificationAnchor);
  const notificationId = isNotificationPopoverOpen ? 'notification-popover' : undefined;

  const renderContent = (index,subIndex) => {
    switch (index) {
      case 0: navigate('leave-balance');
              break;
      case 1: navigate('profile');
              break;
      case 2:
          if (subIndex===0) {
            navigate('attendance-activity');
            break;
          } 
          if (subIndex===1) {
            navigate('attendance-request');
            break;
          }
          navigate('attendance');
          break;
      case 3: 
            navigate('leave-request');
            break;
      case 4: 
            navigate('myclaims');
            break;
      case 5: 
            navigate('mypeople');
            break;
      case 6: 
            navigate('mypayslips');
              break;
      case 7: 
            navigate('workfromhome');
            break;
      case 8: 
            navigate('resignation');
            break;
      case 9: 
            navigate('holidays');
            break;
      default: navigate('leave-balance');
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Profile', icon: <GroupsIcon /> },
    {
      text: 'Attendance',
      icon: <DatasetIcon />,
      subItems: [
        { text: 'Attendance Activity',index:0 },
        { text: 'Attendance Requests',index:1 },
      ],
    },
    { text: 'My Leave Requests', icon: <CancelIcon /> },
    { text: 'My Claims', icon: <CreditScoreIcon /> },
    { text: 'My People', icon: <PeopleIcon /> },
    { text: 'My Payslips', icon: <PaymentsOutlinedIcon /> },
    { text: 'Work From Home', icon: <HouseOutlinedIcon /> },
    { text: 'Resignation', icon: <PersonRemoveOutlinedIcon /> },
    { text: 'Holidays', icon: <HolidayVillageIcon /> },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        variant={isMobile || isTablet ? "temporary" : "permanent"}
        open={isMobile || isTablet ? open : true}
        onClose={isMobile || isTablet ? handleDrawerToggle : undefined}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            transition: 'width 0.3s',
            overflowX: 'hidden',

            backgroundColor: 'rgb(6, 6, 34)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
        }}
      >
        <div style={{ padding: '16px', display: 'flex', justifyContent: open ? 'space-between' : 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <XIcon style={{ marginRight: open ? '10px' : '0', color: '#FFFFFF' }} />
            {open && <Typography variant="h6" style={{ color: '#FFFFFF' }}>Emploix</Typography>}
          </div>
          <IconButton onClick={handleDrawerToggle} style={{ color: '#FFFFFF' }}>
            <MenuOpenIcon />
          </IconButton>
        </div>

        <div style={{ flexGrow: 1, overflowY: 'auto' ,cursor:'pointer'}}>
        <List>
  {menuItems.map((item, index) => (
    <React.Fragment key={index}>
      <ListItem button onClick={() => item.subItems ? toggleAttendance() : handleMenuItemClick(index)}>
        <ListItemIcon style={{ color: '#FFFFFF' }}>{item.icon}</ListItemIcon>
        {open && <ListItemText primary={item.text} style={{ color: '#FFFFFF' }} />}
        {item.subItems && (attendanceOpen ? <ExpandLess style={{ color: '#FFFFFF' }} /> : <ExpandMore style={{ color: '#FFFFFF' }} />)}
      </ListItem>
      {item.subItems && (
        <Collapse in={attendanceOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem, subIndex) => (
              <ListItem button key={subIndex} onClick={() => handleMenuItemClick(index, subItem.index)}>
                <ListItemText primary={subItem.text} style={{ color: '#FFFFFF', cursor: 'pointer' }} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  ))} 
</List>

        </div>
      </Drawer>

      <div style={{ marginLeft:'50px', transition: 'margin-left 0.3s' }}>
        <AppBar
          style={{
            width: isMobile || isTablet
              ? '100%'
              : open
                ? 'calc(100% - 240px)'
                : 'calc(100% - 80px)',
            backgroundColor: '#F4F4F4',
            boxShadow: 'none',
          }}>
          <Toolbar style={{ display: 'flex', alignItems: 'center', padding: '0' }}>
              <IconButton
                onClick={handleDrawerToggle}
                edge="start"
                style={{
                  marginRight: '0px', 
                  marginLeft:'10px',
                  color: '#060602',
                  display: isMobile || isTablet ? 'block' : 'none',
                  fontSize: isMobile ? '20px' : '24px',
                  padding: '0',
                }}
              >
                <MenuOpenIcon />
              </IconButton>
              <Typography
                variant="h6"
                style={{
                  flexGrow: 1,
                  color: '#060602',
                  fontWeight: 'bold',
                  fontSize:isMobile? '18px':'1.25rem',
                  marginLeft: isMobile || isTablet ? '0px' : '16px', 
                  marginRight: '0px', 
                }}
              >
                {menuItems[selectedIndex]?.text || 'Dashboard'}
              </Typography>
              <div style={{  display: 'flex' }}>
              <Button
                variant="contained"
                color={checkedIn ? 'warning' : 'success'}
                onClick={handleCheckInOut}
                style={{ 
                  marginLeft : isMobile ?'20px':'auto',
                  marginRight: isMobile? 0:'24px', 
                  padding: isMobile ? ' 8px' : '16px', 
                  width: isMobile ? '210px' : 'auto ', 
                  height: isMobile ? '24px' : '36px', 
                  fontSize: isMobile ? '0.8rem' : 'inherit',
                 }}
                startIcon={checkedIn ? <LogoutIcon /> : <LoginIcon />}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {checkedIn ? (hovered ? 'Check-Out' : `Checked In At ${checkInTime}`) : `Check-In - ${currentTime}`}
              </Button>
              </div>
              
              <IconButton
                aria-describedby={notificationId}
                onClick={handleNotificationClick}
                 onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{  marginRight: '10px' }}
              >
                <NotificationsNoneOutlinedIcon />
              </IconButton>

              <Popover
                id={notificationId}
                open={isNotificationPopoverOpen}
                anchorEl={notificationAnchor}
                onClose={handleNotificationClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ mt: 1, ml: 3 }} 
              >
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Notifications (0)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No notifications found
                  </Typography>
                </Box>
              </Popover>

                <Button aria-describedby={id} onClick={handleClick}>
                  <IconButton style={{ marginRight: '32px', display: 'flex', alignItems: 'center' }}>
                    <AccountCircle />
                    <div style={{ marginLeft: '8px', display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">
                        {userDetails.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {userDetails.role}
                      </Typography>
                    </div>
                  </IconButton>
                </Button>

                <Popover
                  id={id}
                  open={isPopoverOpen}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                    sx={{ mt: 1, ml: 1.5 }} 
                  >
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 0.75,cursor: 'pointer' }}
                    onClick={() => navigate('/change-password')}
                  >
                  <SettingsIcon sx={{ mr: 1 }} />
                    <Typography>Change Password</Typography>
                  </Box>

                  {/* {showForm && (
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Current Password"
                        type="password"
                        variant="outlined"
                        value={oldPasswordInput}
                        onChange={(e) => setOldPasswordInput(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Change Password
                    </Button>
                    {message && (
                        <Typography color={message.includes("successfully") ? "success.main" : "error.main"} mt={2}>
                            {message}
                        </Typography>
                    )}
                </form>
                )} */}

                  <Box 
                  sx={{ display: 'flex', alignItems: 'center', p: 0.75 ,cursor: 'pointer'}}
                  className="logout-button"
                  onClick={handleLogout}
                  >
                    <LogoutIcon sx={{ mr: 1 }} />
                    <Typography>Logout</Typography>
                  </Box>
                </Popover>
            </Toolbar>

        </AppBar>

        <div style={{ paddingTop:'140px'}}>
          <Grid container spacing={5}>
            {/* {renderContent()} */}
            <Outlet/>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
