import type { Metadata } from 'next';
import './globals.css';

import { Grid2 as Grid } from '@mui/material';

import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Book Review App',
  description: 'Review books and provide your feedback',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <Grid container className="parent">
          <Header />
          <Grid size={1}></Grid>
          <Grid container size={10} className="grid_container">
            {children}
          </Grid>
          <Grid size={1}></Grid>
        </Grid>
      </body>
    </html>
  );
};

export default RootLayout;
