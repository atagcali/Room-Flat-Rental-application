

import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { houses as houses } from '../fdata/test-data';
import HouseCard from './HouseCard';

const HouseCards = () => {
  const [cards] = React.useState(houses);
  if (!cards.length) {
    return null;
  }
  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {cards.map((house) => {
          return (
            <Grid key={house.id} item xs={12} sm={4} md={4} lg={3}>
              <HouseCard house={house} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HouseCards;
