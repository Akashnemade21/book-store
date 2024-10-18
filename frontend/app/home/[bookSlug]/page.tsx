'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { CircularProgress, Grid2 as Grid, Rating, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import { USERTYPE, VARIANT } from '@/utils/constants';
import { getBookById } from '@/utils/actions';
import LinkButton from '@/components/LinkButton';
import bookReview from '@/assets/book-review.png';
import SubmitReviewModal from '@/components/SubmitReviewModal/page';
import ReviewItem from '@/components/ReviewItem';

import { bookInterface, reviewInterface, userInterface } from '@/utils/interface';
import { formateDate } from '@/utils/utils';

import classes from './page.module.css';

const BookDetail = ({
  params,
}: {
  params: {
    bookSlug: number;
  };
}) => {
  const [bookData, setBookData] = useState<bookInterface>({
    id: '1',
    title: '',
    author: '',
    publicationDate: '',
    bookCover: '',
    rating: '',
    reviewNum: 0,
  });
  const [reviewsList, setReviewsList] = useState<reviewInterface[]>([
    {
      id: '',
      bookId: '',
      userId: '',
      rating: 0,
      reviewText: '',
      date: '',
      createdAt: '',
      updatedAt: '',
    },
  ]);

  const [showSubmitReviewModal, setShowSubmitReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ id: 0, rating: 0, reviewText: '' });
  const [user, setUser] = useState<userInterface>({
    id: '',
    name: '',
    email: '',
    userType: USERTYPE.regular,
    profilePic: '',
  });

  function showReviewModal() {
    setShowSubmitReviewModal(true);
  }

  function hideReviewModal() {
    setShowSubmitReviewModal(false);
    setReviewData({ id: 0, rating: 0, reviewText: '' });
  }

  function showUpdateReviewModal(data: { id: number; rating: number; reviewText: string }) {
    setShowSubmitReviewModal(true);
    setReviewData(data);
  }

  function updateReviews(newReview: reviewInterface) {
    const updatedReview = {
      ...newReview,
      User: {
        id: user.id,
        name: user.name,
      },
    };
    setReviewsList([...reviewsList, updatedReview]);
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    if (userData.id) {
      setUser(userData);
    }

    getBookById(String(params.bookSlug), String(userData.id)).then((data) => {
      setBookData(data.book);
      setReviewsList(data.reviews);
    });
  }, [params.bookSlug]);

  const averageRating = reviewsList.reduce((total, review) => total + review.rating, 0) / reviewsList.length;

  if (!bookData.title) return <CircularProgress />;

  return (
    <>
      <Grid size={1}></Grid>
      <Grid size={4}>
        <Image src={bookData.bookCover || bookReview} className={classes.image} alt="Book Image" />
      </Grid>
      <Grid container alignItems="center" size={6}>
        <Grid size={2}></Grid>
        <Grid size={9}>
          <Typography variant="h3" className={classes.margin_tb}>
            {bookData.title}
          </Typography>
          <Typography variant="h5" className="rating_number">
            <Rating value={averageRating} readOnly size="large" /> &nbsp; ({reviewsList.length})
          </Typography>
          <Typography variant="h5" className={classes.margin_tb}>
            Author: {bookData.author}
          </Typography>
          <Typography variant="h5" className={classes.margin_tb}>
            Publication Date: {formateDate(bookData.publicationDate)}
          </Typography>
          <LinkButton
            className={classes.link_button}
            startIcon={<Add />}
            variant={VARIANT.contained}
            onClick={showReviewModal}
          >
            Add Review
          </LinkButton>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>
      <Grid size={1}></Grid>

      <SubmitReviewModal
        showModal={showSubmitReviewModal}
        bookId={params.bookSlug}
        updateReviews={updateReviews}
        handleClose={hideReviewModal}
        data={reviewData}
      />

      <Grid size={1}></Grid>
      <Grid size={10} className={classes.review_grid}>
        <Typography variant="h3">User Reviews</Typography>
      </Grid>
      <Grid size={1}></Grid>

      <Grid size={1}></Grid>
      <Grid size={10}>
        {reviewsList.map((review) => (
          <ReviewItem key={review.id} review={review} userId={user.id} showUpdateReviewModal={showUpdateReviewModal} />
        ))}
      </Grid>
      <Grid size={1}></Grid>
    </>
  );
};

export default BookDetail;
