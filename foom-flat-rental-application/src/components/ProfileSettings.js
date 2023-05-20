import React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// react icons

import { AiOutlineMenu } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { flexCenter } from '../themes/commonStyles';

const ProfileSettings = () => {
  return (
    <Box sx={flexCenter}>
      <Button variant='contained'> List Your House </Button>
      <Stack direction = "row">
        <Button
          sx={{
            borderRadius: 10,
            border: '1px solid #ddd',
          }}
        >
          <Stack direction = "row" spacing = {1} >
            <AiOutlineMenu size={24} />
            <FaRegUserCircle size={24} />
          </Stack>
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfileSettings;