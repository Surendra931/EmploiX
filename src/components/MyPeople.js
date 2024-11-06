import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import '../css/adjust.css'
 

const people = [
  { name: "Surendra Sriramula", id:"PTX36",department: "Development" },
  { name: "Jitendra",id:"PTX37", department: "Developemnt" },
  
  { name: "Surendra Sriramula", id:"PTX36",department: "Development" },
  { name: "Jitendra",id:"PTX37", department: "Developemnt" },

  { name: "Surendra Sriramula", id:"PTX36",department: "Development" },
  { name: "Jitendra",id:"PTX37", department: "Developemnt" },

  { name: "Surendra Sriramula", id:"PTX36",department: "Development" },
  { name: "Jitendra",id:"PTX37", department: "Developemnt" },

  { name: "Surendra Sriramula", id:"PTX36",department: "Development" },
  { name: "Jitendra",id:"PTX37", department: "Developemnt" },
];

export default function MyPeople() {
  return (
    
    <div className='People-random'>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        p: 2,
      }}
    >
      {people.map((person, index) => (
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
          <Avatar sx={{ bgcolor: '#D3D3D3', marginRight: 3,width:'75px',height:'75px' }}>
            <PersonIcon />
          </Avatar>
          <Stack>
            <Typography variant="body2" sx={{fontWeight:'bold'}}>{person.name}</Typography>
            <Typography variant='body2'>{person.id}</Typography>
            <Typography variant="body2" color="text.secondary">
              {person.department}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Box>
    </div>
    
  );
}
