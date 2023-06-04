import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/emergency-rental-properties-by-city');
        const dataArray = Object.entries(response.data).map(([city, count]) => ({ city, count }));
        setData(dataArray);
       
      } catch (error) {
        console.error('Error fetching rental properties by city:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item key={item.city} xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h6" component="h2">
            City: {item.city}
          </Typography>
          <Typography variant="body1">
            Count: {item.count}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Stats;
