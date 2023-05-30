import React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom';
// react icons

import { AiOutlineMenu } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { flexCenter } from '../themes/commonStyles';
import DropDown from "./DropDown";
const BarSettings = () => {
  return (
    <Box sx={flexCenter}>
      <Button component={Link} to="/ListHouse" variant='contained'> List Your House </Button>
      <Button component={Link} to="/Messages" variant='contained'> Message </Button>
      <Stack direction = "row">
        <DropDown/>
      </Stack>
    </Box>
  );
};

export default BarSettings;