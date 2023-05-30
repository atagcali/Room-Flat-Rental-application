import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { FaRegUserCircle } from 'react-icons/fa';
import {
    flexBetweenCenter,
    dFlex,
    displayOnDesktop,
    flexCenter,
  } from '../themes/commonStyles';

const EditProfile = () => {
  const userData = localStorage.getItem('userData');
  let user = null;
  if(userData == null){
     user = {
      name: 'John',
      surname: 'Doe',
      password: '******',
      balance: 2000,
      email: 'johndoe@example.com',
      location: 'ankara'
    }
  }
    else
    {
       user = JSON.parse(userData);
    }
  
  return (
    <Box sx={{
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Profile
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
      <FaRegUserCircle size={24} />

      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={user.name}
          
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' } // custom styles for the input
          }}
         
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Surname"
          variant="outlined"
          value={user.surname}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' } // custom styles for the input
          }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Password"
          variant="outlined"
          value={user.password}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' } // custom styles for the input
          }}
        />
        <Button variant='contained' size="small" sx={{
            mt: 1,
            ml: 1,
        }}> Change Password</Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Balance"
          variant="outlined"
          value={user.balance}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' } // custom styles for the input
          }}
        />
        <Button variant='contained' size="small" sx={{
            mt: 1,
            ml: 1,
        }}> Add Balance</Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          value={user.email}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' } // custom styles for the input
          }}
        />
         <Button variant='contained' size="small" sx={{
            mt: 1,
            ml: 1,
        }}> Change email</Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="location"
          variant="outlined"
          value={user.location}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            sx: { fontWeight: 'bold' } // custom styles for the input
          }}
        />
         <Button variant='contained' size="small" sx={{
            mt: 1,
            ml: 1,
        }}> Change location</Button>
      </Box>
    </Box>
  );
};

export default EditProfile;