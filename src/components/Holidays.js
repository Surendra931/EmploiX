import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; 
import '../css/adjust.css';
import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';



const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Menu click handler
  const handleMenuClick = (event, holiday) => {
    setAnchorEl(event.currentTarget);
    setEditingHoliday(holiday);
    setEditedName(holiday.name);
    setEditedDate(holiday.date);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setEditingHoliday(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHoliday(null);
  };

  const handleEditSubmit = () => {
    setHolidays((prevHolidays) =>
      prevHolidays.map((holiday) =>
        holiday.id === editingHoliday.id
          ? { ...holiday, name: editedName, date: editedDate }
          : holiday
      )
    );
    handleCloseDialog();
  };

  const handleDeactivate = () => {
    setHolidays((prevHolidays) =>
      prevHolidays.map((holiday) =>
        holiday.id === editingHoliday.id ? { ...holiday, status: 'Deactivated' } : holiday
      )
    );
    handleMenuClose();
  };

  const handleDelete = () => {
    setHolidays((prevHolidays) => prevHolidays.filter((holiday) => holiday.id !== editingHoliday.id));
    handleMenuClose();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const token=getFromLocalStorage(STOREAGE_KEYS.TOKEN);
      const response = await axios.get('https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/PublicHoliday/list', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'url': 'staging.stellarhrm.com',
        },
      });
      setFetchedData(response.data.rows); // Assuming response.data.rows contains the holiday data
    } catch (error) {
      console.error("Failed to fetch holidays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='Holidays-random'>
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px', width: '100%', margin: '0 auto' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Holidays
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#D3D3D3' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Holiday Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedData.map((holiday) => (
                <TableRow key={holiday.public_holiday_id}>
                  <TableCell>{holiday.name}</TableCell>
                  <TableCell>{holiday.date}</TableCell>
                  <TableCell>{holiday.is_active ? 'Active' : 'Deactivated'}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, holiday)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && editingHoliday?.public_holiday_id === holiday.public_holiday_id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleOpenDialog}>
                        <EditIcon sx={{ mr: 1 }} /> Edit
                      </MenuItem>
                      <MenuItem onClick={handleDeactivate}>
                        <VisibilityOffIcon sx={{ mr: 1 }} /> Deactivate
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <DeleteIcon sx={{ mr: 1 }} /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog for Editing Holiday */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Edit Holiday</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Holiday Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} startIcon={<CloseIcon />}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} startIcon={<CheckIcon />}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Holidays;
