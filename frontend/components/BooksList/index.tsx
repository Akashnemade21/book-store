'use client';

import { Suspense, useEffect, useState } from 'react';

import { Grid2 as Grid } from '@mui/material';

import CustomCard from '@/components/CustomCard';
import { getBooks } from '@/utils/actions';

const Books = () => {
  const [bookList, setBookList] = useState<
    [
      {
        id: number;
        title: string;
        author: string;
        publicationDate: string;
        bookCover: string;
        rating: string;
        reviewNum: number;
      },
    ]
  >([
    {
      id: 1,
      title: '',
      author: '',
      publicationDate: '',
      bookCover: '',
      rating: '0',
      reviewNum: 0,
    },
  ]);

  useEffect(() => {
    const value = localStorage.getItem('authToken');

    getBooks(value || '').then((data) => {
      setBookList(data.books);
    });
  }, []);

  return (
    <>
      {bookList.map((book) => {
        return (
          <Grid key={'' + book.id}>
            <CustomCard
              title={book.title}
              author={book.author}
              publicationDate={''}
              rating={book.rating}
              reviewNum={book.reviewNum || 0}
              imageLink=""
              key={book.id}
              id={String(book.id)}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default Books;
