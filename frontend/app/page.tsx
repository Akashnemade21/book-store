import Image from 'next/image';
import Link from 'next/link';

import { Grid2 as Grid, Typography } from '@mui/material';
import { HowToReg } from '@mui/icons-material';

import bookReview from '@/assets/book-review.png';
import LinkButton from '@/components/LinkButton';

import classes from './page.module.css';
import { VARIANT } from '@/utils/constants';

export default function Home() {
  return (
    <>
      <Grid size={1}></Grid>
      <Grid size={4}>
        <Image src={bookReview} className={classes.image} alt="Book store Image" />
      </Grid>
      <Grid container alignItems="center" size={6}>
        <Grid size={1}></Grid>
        <Grid size={10}>
          <Typography variant="h2">Book Reviews</Typography>
          <Typography variant="h5">Check out new books review on the books and what provide your review</Typography>
          <LinkButton className={classes.link_button} startIcon={<HowToReg />} variant={VARIANT.outlined}>
            <Link href="/login">Sign Up</Link>
          </LinkButton>
        </Grid>
        <Grid size={1}></Grid>
      </Grid>
      <Grid size={1}></Grid>
    </>
  );
}
