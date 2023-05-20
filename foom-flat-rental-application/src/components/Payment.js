import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RentHouse from './RentHouse'; 
import Grid from '@mui/material/Grid';
import Image from "../fdata/image.jpg";
import {
  flexBetweenCenter,
  dFlex,
  displayOnDesktop,
  flexCenter,
} from '../themes/commonStyles';

const Payment = () => {
    const house =  {
      id: 1,
      houseImages: [
        {
          id: 1,
          url: Image,
        },
        {
          id: 2,
          url: Image,
        },
        {
          id: 3,
          url: Image,
        },
        {
          id: 4,
          url: Image,
        },
      ],
      house: 'Gardon , Italy',
      describtion: 'nice house in italy with pool',
      price: '15000 tl  night',
      isNew: true,
      rating: 4.5,
    }
       
    return (
        <Box sx={{
            ...flexCenter,
            
        }}>
            <Grid container rowSpacing={7} columnSpacing={7} justifyContent = 'center '>
                <Grid item xs={15} sm={4} md={4} lg={3}>  
                        <RentHouse house={house} />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>  
                      <Typography style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Renter: Emrehan Hoşver</Typography>
                      <Typography  style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Homeowner: Alp Tuğrul</Typography>
                      <Typography style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Current Balance: 2000 </Typography>
                      <Typography style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Price: 1400</Typography>
                      <Typography style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                      }}>Remaining Balance: 600</Typography>
                     
                </Grid>

            </Grid>
        </Box>

    ); 
};

export default Payment;