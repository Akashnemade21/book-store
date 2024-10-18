import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, IconButton } from '@mui/material';

import classes from './index.module.css';
import { formateDate } from '@/utils/utils';
import { Edit } from '@mui/icons-material';

const ReviewItem = ({
  review,
  userId,
  showUpdateReviewModal,
}: {
  review: any;
  userId: string;
  showUpdateReviewModal: (data: { id: number; rating: number; reviewText: string }) => void;
}) => {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem className={classes.list_items}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h6">{review.User.name}</Typography>}
          secondary={<Typography variant="subtitle1">{review.reviewText}</Typography>}
        />
        <ListItemText
          secondary={
            <Typography variant="subtitle1">
              {review.User.id === userId ? (
                <>
                  <IconButton
                    onClick={() =>
                      showUpdateReviewModal({ id: review.id, rating: review.rating, reviewText: review.reviewText })
                    }
                  >
                    <Edit />
                  </IconButton>{' '}
                  {formateDate(review.date)}
                </>
              ) : (
                formateDate(review.date)
              )}
            </Typography>
          }
          className={classes.item_date}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default ReviewItem;
