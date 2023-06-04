import * as React from 'react';
import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import {
  flexBetween,
  dFlex,
  houseDot,
  fixedIcon,
  houseImage,
  fixedBottom,
} from '../themes/commonStyles';
import './HouseCard.css';
import houseImageSrc from "../fdata/image.jpg";
import Review from './Review';
const RentHouse =  ({ house }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [reviews,setReviews] = useState([]);
  const [currentHouse,setCurrentHouse] = useState();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const t2 = parseInt(house.id);
        console.log(house); // Confirm that the house object is logged correctly
        console.log(t2); // Confirm the parsed integer value of house.id
  
        const response = await axios.get(`http://localhost:8080/api/reviews/house/${t2}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error retrieving booking data:', error);
      }
    };
  
    if (house && house.id) {
      fetchBookings();
    }
  }, [house]);
  
  const maxSteps = 1;
  const hid = house.id;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };

  return (
    <Box
      className="HouseCard"
      sx={{
        flexGrow: 1,
        position: 'relative',
      }}
    >
      <Box sx={fixedIcon}>
        <FaRegHeart size={24} color="#fff" />
      </Box>

      <Box sx={{ position: 'relative' }}>
        <img src={houseImageSrc} alt={house.house} style={houseImage} />
      </Box>

      <Box sx={fixedBottom}>
        <MobileStepper
          sx={{ backgroundColor: 'transparent' }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              sx={houseDot}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              sx={houseDot}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box>

      <Box sx={flexBetween}>
        <Box sx={{ mt: 2 }}>
          <Typography component="h3" align="left">
            {house.title}
          </Typography>
          <Typography component="h4" align="left" variant="caption">
            Location: {house.city }, {house.country}
          </Typography>
          <Typography component="h5" align="left">
            Description: {house.description}
          </Typography>
          <Typography component="h4" align="left" variant="caption">
            PetFriendly: {String(house.petFriendly)} Balcony: {String(house.hasBalcony)}
          </Typography>
          <Typography component="h4" align="left" variant="caption">
            Parking: {String(house.hasParking)} Pool: {String(house.hasPool)}
          </Typography>
          <Typography component="h4" align="left" variant="caption">
            Emergency: {String(house.availableInEmergency)} 
          </Typography>
          <Typography component="h5" align="left" >
            Price: {house.price}, Max Guest: {house.maxGuests}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={dFlex}>
           
              <React.Fragment>
                <Typography component="h5">{house.rating}</Typography>
                <AiFillStar size={18} />
              </React.Fragment>
            
          </Box>
        </Box>
       
      </Box>
      <Review reviews = {reviews} />
    </Box>
  );
};

export default RentHouse;





