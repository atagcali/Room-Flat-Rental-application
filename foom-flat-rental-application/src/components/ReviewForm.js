import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import axios from 'axios';
const ReviewForm = ({ houseId,bookid,homeownerid,isOpen, handleClose, handleSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(reviewText, rating);
    const newReview = {
      travellerId: parseInt(userData.userId),
      bookId: parseInt(bookid),
      homeownerId: parseInt(homeownerid),
      review: reviewText,
      rating: parseInt(rating),
      houseId: parseInt(houseId),
    };

    // Send the POST request
    const response = await axios.post('http://localhost:8080/api/reviews', newReview);

    setReviewText('');
    setRating(0);
    handleClose();
  };

  const handleTextChange = (e) => {
    setReviewText(e.target.value);

  };

  const handleRatingChange = (e, value) => {
    setRating(value);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} centered>
      <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: 4, width: 400 }}>
        <h2>Leave a Review</h2>
        <form onSubmit={handleFormSubmit}>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            required
          />
          <TextField
            label="Your Review"
            multiline
            rows={4}
            value={reviewText}
            onChange={handleTextChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
export default ReviewForm;