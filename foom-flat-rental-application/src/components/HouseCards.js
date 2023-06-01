

import React,{useState,useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { houses as houses } from '../fdata/test-data';
import HouseCard from './HouseCard';
import axios from 'axios';
import dayjs from 'dayjs';

const HouseCards = ({ filter }) => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/rental-properties-location'); // Replace with your actual API endpoint
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  // Apply filtering based on the filter object
  const filteredCards = houses.filter((house) => {
    // Perform filtering logic based on the filter properties
    if (filter.country && house.house !== filter.country) {
      return false;
    }
   /* if (filter.city && house.city !== filter.city) {
      return false;
    }
    if (filter.guests && house.guests < filter.guests) {
      return false;
    }
    if (filter.inDate && dayjs(house.inDate).isBefore(filter.inDate, 'day')) {
      return false;
    }
    if (filter.outDate && dayjs(house.outDate).isAfter(filter.outDate, 'day')) {
      return false;
    }*/
    // Add more filtering conditions for other properties if needed

    return true; // Include the house in the filtered result
  });

  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {filteredCards.map((house) => {
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
