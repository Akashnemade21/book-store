'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Rating,
} from '@mui/material';

import { submitReview, updateReview } from '@/utils/actions';
import { reviewInterface } from '@/utils/interface';

const SubmitReviewModal = ({
  showModal,
  bookId,
  handleClose,
  updateReviews,
  data,
}: {
  showModal: boolean;
  bookId: number;
  handleClose: () => void;
  updateReviews: (newReview: reviewInterface) => void;
  data: any;
}) => {
  const [rating, setRating] = useState(data.rating);
  const [reviewText, setReviewText] = useState(data.reviewText);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reviewText.length > 500) {
      setError('Review text should not exceed 500 characters');
      return;
    }

    const dateObj = new Date();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const date = `${month}/${day}/${year}`;

    const result: {
      success: boolean;
      message: string;
      review: reviewInterface;
    } = data.id
      ? await updateReview({ reviewId: data.id, rating, reviewText, date })
      : await submitReview({ rating, bookId, reviewText, date });

    if (result.success) {
      updateReviews(result.review);
      handleClose();
    } else {
      setError(result.message);
    }
  };

  return (
    <Dialog open={showModal} onClose={handleClose} fullWidth>
      <DialogTitle>{data.id ? 'Update Review' : 'Add Review'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography className="rating_number" variant="subtitle1">
            Rating: &nbsp;
            <Rating
              name="rating"
              value={rating}
              defaultValue={data.rating}
              onChange={(_, newValue) => {
                setRating(newValue || 0);
              }}
            />
          </Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            id="reviewText"
            name="reviewText"
            label="Review"
            type="text"
            fullWidth
            variant="standard"
            value={reviewText}
            defaultValue={data.reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          {error && <Typography className="error_text">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SubmitReviewModal;
