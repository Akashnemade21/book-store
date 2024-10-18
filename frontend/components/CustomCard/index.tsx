import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, Typography, CardActionArea, Rating, CircularProgress, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import book from '@/assets/book.png';
import classes from './index.module.css';
import { bookInterface } from '@/utils/interface';
import { formateDate } from '@/utils/utils';
import LinkButton from '../LinkButton';

interface CustomCardProps extends bookInterface {
  adminUser: boolean;
}

const BookCard = ({
  title = '',
  author = '',
  publicationDate = '',
  rating = '',
  reviewNum = 0,
  imageLink = '',
  id = '',
  adminUser = false,
}: CustomCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`/home/${id}`}>
        <CardActionArea>
          <CardContent className={classes.card_content}>
            <Image src={imageLink ? imageLink : book} className={classes.image} alt="Book store Image" />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle1" className="rating_number">
              <Rating value={Number(rating)} readOnly /> &nbsp; ({reviewNum})
            </Typography>
            <Typography variant="subtitle1">Author: {author}</Typography>
            <Typography variant="subtitle1">Publication Date: {formateDate(publicationDate)}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {adminUser && (
        <CardContent className={classes.admin_content}>
          <IconButton aria-label="delete" size="large" className={classes.admin_button}>
            <Delete fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete" size="large" className={classes.admin_button}>
            <Edit fontSize="inherit" />
          </IconButton>
        </CardContent>
      )}
    </Card>
  );
};

export default BookCard;
