import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {Link} from 'react-router-dom';
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
const HouseCard = ({ house }) => {
  const [activeStep, setActiveStep] = React.useState(0);

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
          <Typography component="h5" align="left">
            Price: {house.price}, Max Guest: {house.maxGuests}
          </Typography>
          <Button component={Link} to={`/Payment/${hid}`} variant="contained">
            Rent
          </Button>
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
    </Box>
  );
};

export default HouseCard;





