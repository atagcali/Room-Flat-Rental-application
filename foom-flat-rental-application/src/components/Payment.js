import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RentHouse from './RentHouse'; 
import Grid from '@mui/material/Grid';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns'
import {
  flexBetweenCenter,
  dFlex,
  displayOnDesktop,
  flexCenter,
} from '../themes/commonStyles';
import axios from 'axios'; 
import {useParams} from 'react-router-dom';
import HouseCard from './HouseCard';

const Payment =  () => {
  const  {id}  = useParams();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));

  const [house,setHouse] = useState([null]);
  const [owner,setOwner] = useState([null]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const updateBalance = (newBalance) => {
    const updatedUserData = { ...userData, balance: newBalance };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
  };
  
  const getHouseAndOwnerData = async () => {
    try {
      
      
      const response = await axios.get(`http://localhost:8080/api/rental-properties-location/${id}`);
      setHouse(response.data);
      const t1 = parseInt(response.data.userId);
      const response2 = await axios.get(`http://localhost:8080/api/user/${t1}`);
      setOwner(response2.data);
  
    } catch (error) {
      console.error('Error fetching  house:', error);
    }
  };

  useEffect(() => {
    getHouseAndOwnerData();
  }, []);
  const remainingBalance = userData.balance - house.price;
  const isRentButtonDisabled = remainingBalance < 0;
  const handleRentButtonClick = async () => {
    // Perform the rent action
    console.log(owner);
    try {
      // Make the rent request and update the userData
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      
      const response = await axios.post('http://localhost:8080/api/payments', {
        // Include the necessary data in the request body
        // For example:
        travellerId: userData.userId,
        homeownerId: owner.userId,
        paymentMethod: "credit card",
        amount: house.price,
        date: currentDate,

      });

      const response2 = await axios.post('http://localhost:8080/api/bookings', {
        // Include the necessary data in the request body
        // For example:
        travellerId: userData.userId,
        rentalPropertyId: parseInt(id),
        pricePaid: "credit card",
        amount: house.price,
        checkinDate:checkInDate ,
        checkoutDate: checkOutDate,
        status: 'true',

      });

      // Update the userData in localStorage and state
      updateBalance(userData.balance-house.price);
    } catch (error) {
      console.error('Error renting house:', error);
    }
  };

    return (
        <Box sx={{
            ...flexCenter,
            
        }}>
            <Grid container rowSpacing={7} columnSpacing={7} justifyContent = 'center '>
                <Grid item xs={15} sm={4} md={4} lg={3}>  
                        <RentHouse house = {house}/>
                       
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>  
                      <Typography style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Renter: {userData.name} {userData.surname}</Typography>
                      <Typography  style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Homeowner: {owner.name} {owner.surname}</Typography>
                      <Typography style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Current Balance: {userData.balance} </Typography>
                      <Typography style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Price:{house.price} </Typography>
                      <Typography style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Remaining Balance: {userData.balance - house.price}</Typography>
                        
        <label>Check-in Date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            renderInput={(params) => <input {...params} />}
          />
        </LocalizationProvider>
      

  
        <label>Check-out Date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            renderInput={(params) => <input {...params} />}
          />
        </LocalizationProvider>
      


<Box>
      {/* Render the rest of your component */}
      <Button disabled={isRentButtonDisabled}
      onClick={isRentButtonDisabled ? null : handleRentButtonClick}>
        Rent
      </Button>
      {isRentButtonDisabled && (
        <p>Your balance is not enough.</p>
      )}
    </Box>
                     
                </Grid>

            </Grid>
        </Box>

    ); 
};

export default Payment;