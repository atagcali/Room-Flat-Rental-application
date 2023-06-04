import * as React from 'react';
import {useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import Review from './Review';
import Modal from '@mui/material/Modal';
import { AiFillStar } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import ReviewForm from './ReviewForm';
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
const RevProperty = ({ house,checkoutDate,bookid,homeownerid }) => {
  const [activeStep, setActiveStep] = useState(0);
 
  const [showReviewFormModal, setShowReviewFormModal] = useState(false);
  const currentDate = new Date(); // Get the current date
  const [reviews,setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const t2 = parseInt(house.id);

  
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
  const handleReviewFormSubmit = () => {

  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };
  const canReview = currentDate > new Date(checkoutDate);
  const handleReviewButtonClick = () => {
    if (canReview) {
      setShowReviewFormModal(true);
    }
  };

  const handleReviewFormClose = () => {
    setShowReviewFormModal(false);
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
          {canReview ? (
            <Button
              
              variant="contained"
              onClick={handleReviewButtonClick}
            >
              Review
            </Button>
          ) : (
            <Button variant="contained" disabled>
              Review
            </Button>
          )}
         
            <ReviewForm houseId={house.id}
            bookid = {bookid}
            homeownerid = {homeownerid} 
            isOpen={showReviewFormModal}
            handleClose={handleReviewFormClose}
            handleSubmit={handleReviewFormSubmit}
             />
          
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
      <Button onClick={handleOpenModal} variant="contained">
        Show Reviews
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4 }}>
         
          <Review reviews={reviews} />
        </Box>
      </Modal>
    </Box>
  );
};

export default RevProperty;





