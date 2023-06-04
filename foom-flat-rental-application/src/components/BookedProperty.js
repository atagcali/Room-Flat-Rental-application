

import React,{useState,useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { houses as houses } from '../fdata/test-data';
import RevProperty from './RevProperty';
import axios from 'axios';
import dayjs from 'dayjs';

const BookedProperty = () => {
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const t1 = parseInt(userData.userId);
        const response = await axios.get(`http://localhost:8080/api/bookings/traveller/${t1}`);
        const bookingsData = response.data;

        // Iterate over each booking and fetch the rental property data
        const updatedBookings = await Promise.all(
          bookingsData.map(async (booking) => {
            const t2 = parseInt(booking.rentalPropertyId);
            const rentalPropertyResponse = await axios.get(
              `http://localhost:8080/api/rental-properties-location/${t2}`
            );
            const houses = rentalPropertyResponse.data;

            // Merge the rental property data with the booking data
            return {
              ...booking,
              houses: houses,
            };
          })
        );

        setBookings(updatedBookings);
       
      } catch (error) {
        console.error('Error retrieving booking data:', error);
      }
    };

    fetchBookings();
  }, []);
  console.log(bookings);

  // Apply filtering based on the filter object
  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
      {bookings.map((booking) => {
          const { houses, checkoutDate } = booking;
          return (
            <Grid key={houses.id} item xs={12} sm={4} md={4} lg={3}>
              <RevProperty house={houses} checkoutDate={dayjs(checkoutDate)}bookid = {booking.id} homeownerid = {booking.homeownerId} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BookedProperty;
