import { Grid2 as Grid } from '@mui/material';
import BooksList from '@/components/BooksList';

export default function Home() {
  return (
    <Grid container spacing={10}>
      <BooksList />
    </Grid>
  );
}
