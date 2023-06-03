

import React,{useState,useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { houses as houses } from '../fdata/test-data';
import EditProperty from './EditProperty';
import axios from 'axios';
import dayjs from 'dayjs';

const MyHouses = () => {
  const [houses, setHouses] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const t1 = parseInt(userData.userId);
        const response = await axios.get(`http://localhost:8080/api/rental-properties-location/user/${t1}`);
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  // Apply filtering based on the filter object
  const filteredCards = houses;

  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {filteredCards.map((house) => {
          return (
            <Grid key={house.id} item xs={12} sm={4} md={4} lg={3}>
              <EditProperty house={house} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyHouses;
