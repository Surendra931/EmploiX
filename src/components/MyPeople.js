import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import '../css/adjust.css';

import { getFromLocalStorage } from '../utils/utils';
import { STOREAGE_KEYS } from '../utils/constants';
import axios from 'axios';

export default function MyPeople() {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchMyTeam = async () => {
      try {
        const token = getFromLocalStorage(STOREAGE_KEYS.TOKEN);
        const response = await axios.get(
          'https://nodejs-projects-stellerhrm-dev.un7jm4.easypanel.host/api/Employee/myTeam',
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              url: 'staging.stellarhrm.com',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.rows ?? [];
        setTeamData(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchMyTeam();
  }, []);

  return (
    <div className="People-random">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          p: 2,
        }}
      >
        {teamData?.map((request, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 300,
              padding: 2,
            }}
          >
            <Avatar sx={{ bgcolor: '#D3D3D3', marginRight: 3, width: '75px', height: '75px' }}>
              <PersonIcon />
            </Avatar>
            <Stack>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {request.fname}
              </Typography>
              <Typography variant="body2">{request.emp_code}</Typography>
              <Typography variant="body2" color="text.secondary">
                {request.Department?.name}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Box>
    </div>
  );
}
