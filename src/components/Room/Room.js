import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import WcIcon from '@mui/icons-material/Wc';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

export default function Room({ room }) {
  const navigate = useNavigate();  // Corrected useNavigate usage

  const handleBook = (bedType) => {
    navigate(`/book/${bedType}`);  // Use navigate without .push()
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {room.avatar}
          </Avatar>
        }
        title={room.title}
      />
      <CardMedia
        sx={{ height: 0, paddingTop: '56.25%' }}
        image={room.imgUrl}
        title="Room Image"
      />
      <img src={`/images/${room.bedType}.png`} alt="" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {room.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="bed type">
          <LocalHotelIcon /> {room.bed}
        </IconButton>
        <IconButton aria-label="capacity">
          <WcIcon /> {room.capacity}
        </IconButton>
        <IconButton aria-label="price">
          <AttachMoneyIcon /> {room.price}
        </IconButton>
        <Button
          onClick={() => handleBook(room.bedType)}
          variant="contained"
          color="primary"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
}
