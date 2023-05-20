import React from 'react';
import Box from '@mui/material/Box';
import {Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';
// react icons
import { flexCenter } from '../themes/commonStyles';

const Logo = () => {
  return (
  <Button component={Link} to="/" style={{ textDecoration: 'none' }}>
  <Box sx={flexCenter}>
      
  <Typography
    sx={{
      ml: 1,
      color: (theme) => theme.palette.secondary.main,
      fontSize: '20px',
      fontWeight: 'bold',
    }}
    textTransform={'none'}
  
    component="h6"
  >
    BilkentBooking
  </Typography>
</Box>
  </Button>
    );
};

export default Logo;