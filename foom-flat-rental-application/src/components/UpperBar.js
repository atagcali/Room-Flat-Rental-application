import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ProfileSettings from './ProfileSettings';
import HouseSearch from './HouseSearch';
import Logo from './Logo';
import {
  flexBetweenCenter,
  dFlex,
  displayOnDesktop,
  flexCenter,
} from '../themes/commonStyles';


const UpperBar = () => {
  return (
    <Box
      sx={{
        ...dFlex,
        minHeight: 70,
        borderBottom: '1px solid #ddd',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            ...flexBetweenCenter,
            minHeight: 90,
            px: 4,
          }}
        >
          <Box sx={flexCenter}>
            <Logo />
          </Box>
          <Box sx={flexCenter}>
            <HouseSearch />
          </Box>
          <Box sx={flexCenter}>
            <ProfileSettings />
          </Box>
          
        </Box>
      </Container>
    </Box>
  );
};

export default UpperBar;