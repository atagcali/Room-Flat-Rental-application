import React from 'react';
import { Typography, Box } from '@mui/material';

const Review = ({ reviews }) => {
  // Check if reviews is null or undefined
  if (!reviews) {
    return null; // Return null to render nothing
  }

  return (
    <Box>
      <Typography variant="h4">Reviews</Typography>
      {reviews.map((review) => {return  (
        <Box
          key={review.reviewId}
          sx={{
            mt: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          
          <Typography variant="body1">{review.review}</Typography>
          <Typography variant="caption">Rating: {review.rating}</Typography>
        </Box>
      );})}
    </Box>
  );
};

export default Review;
