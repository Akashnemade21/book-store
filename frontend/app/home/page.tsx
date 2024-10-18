'use client';

import { useEffect, useState } from 'react';

import { Grid2 as Grid, CircularProgress } from '@mui/material';

import CustomCard from '@/components/CustomCard';
import { getBooks } from '@/utils/actions';
import { bookInterface, userInterface } from '@/utils/interface';
import { USERTYPE } from '@/utils/constants';

const Books = () => {
  const [bookList, setBookList] = useState<[bookInterface]>([
    {
      id: '1',
      title: '',
      author: '',
      publicationDate: '',
      bookCover: '',
      rating: '0',
      reviewNum: 0,
    },
  ]);

  const [user, setUser] = useState<userInterface>({
    id: '',
    name: '',
    email: '',
    userType: USERTYPE.regular,
    profilePic: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    if (userData.id) {
      setUser(userData);
    }

    setLoading(true);
    getBooks().then((data) => {
      setBookList(data.books);
    });
    setLoading(false);
  }, []);
  return (
    <Grid container spacing={10}>
      {loading ? (
        <CircularProgress />
      ) : (
        bookList.map((book) => (
          <Grid key={'' + book.id}>
            <CustomCard
              title={book.title}
              author={book.author}
              publicationDate={book.publicationDate}
              rating={book.rating}
              reviewNum={book.reviewNum || 0}
              imageLink=""
              key={book.id}
              id={String(book.id)}
              bookCover=""
              adminUser={user.userType === USERTYPE.admin}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Books;
