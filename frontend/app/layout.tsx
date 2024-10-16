import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/Header';
import { Grid2 as Grid } from '@mui/material';

export const metadata: Metadata = {
  title: 'Book Review App',
  description: 'Review books and provide your feedback',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Grid container className="grid_container">
          <Grid size={1}></Grid>
          <Grid container size={10}>
            {children}
          </Grid>
          <Grid size={1}></Grid>
        </Grid>
      </body>
    </html>
  );
}
