import Image from 'next/image';

import { Card, CardContent, Typography, CardActionArea, Rating } from '@mui/material';

import book from '@/assets/book.png';
import classes from './index.module.css';
import Link from 'next/link';

interface cardProps {
  title: string;
  author: string;
  publicationDate: string;
  rating: string;
  reviewNum: number;
  imageLink?: string;
  id: string;
}

const CustomCard = ({
  title = 'Book Title',
  author = 'Author',
  publicationDate = 'DD/MM/YYYY',
  rating = '0',
  reviewNum = 0,
  imageLink = '',
  id = '',
}: cardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`/home/${id}`}>
        <CardActionArea>
          <CardContent className={classes.card_content}>
            <Image src={imageLink ? imageLink : book} className={classes.image} alt="Book store Image" />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1" className={classes.rating_number}>
              <Rating defaultValue={Number(rating)} readOnly /> &nbsp; ({reviewNum})
            </Typography>
            <Typography variant="subtitle1">Auther: {author}</Typography>
            <Typography variant="subtitle1">Publication Date: {publicationDate}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
export default CustomCard;
