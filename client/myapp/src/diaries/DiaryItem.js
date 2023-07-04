import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost, addCommentToPost, getPostComments } from '../api-helpers/helpers';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DiaryItem = ({ title, location, image, description, date, id, user, deleteIt, bc }) => {
  const isRelated = localStorage.getItem('userId') === user._id;
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);

  useEffect(() => {
    getPostComments(id)
      .then((data) => {
        setComments(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteThePost = () => {
    deletePost(id)
      .then((data) => {
        navigate('/diaries');
        deleteIt();
      })
      .catch((err) => console.log(err));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const getCurrentUser = () => {
    try {
      const userID = localStorage.getItem('userId');
      return userID;
    } catch (error) {
      throw error;
    }
  };

  const handleAddComment = () => {
    if (comment.trim().length === 0) {
      return;
    }
    const user = getCurrentUser(); // Get the current logged-in user
    const currentDate = new Date(); // Get the current date and time
    const newComment = {
      user: user,
      content: comment,
      date: currentDate,
    };
    addCommentToPost(id, newComment)
      .then((data) => {
        setComments([...comments, data.comment]);
        setComment('');
      })
      .catch((err) => console.log(err));
  };
  

  const toggleComments = () => {
    setIsCommentsExpanded(!isCommentsExpanded);
  };

  return (
    <Card
      sx={{
        margin: 2,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '5px 5px 5px 5px grey',
        backgroundColor: `${bc}`,
      }}
      className="responsive-card"
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{user.name.charAt(0).toUpperCase()}</Avatar>}
        action={<IconButton aria-label="LocationOnIcon"><LocationOnIcon /></IconButton>}
        title={location}
        subheader={date}
      />
      <img src={image} alt={title} />
      <CardContent>
        <Typography variant="h5" color="text.primary" fontSize={'3.5vh'} paddingBottom={'1vh'}>
          {title}
        </Typography>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={'bold'} variant={'div'} fontSize="2.5vh" marginBottom={'1vh'}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      {isRelated && (
        <Box justifyContent={'space-between'} display="flex" flexDirection="row" marginLeft={'auto'} marginTop={'auto'}>
          <IconButton LinkComponent={Link} to={`/editPost/${id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={deleteThePost}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <Box display="flex" alignItems="center" mt={1}>
        <Typography variant="h6">Comments:</Typography>
        <IconButton onClick={toggleComments}>
          {isCommentsExpanded ? (
            <ExpandLessIcon />
          ) : (
            <ExpandMoreIcon />
          )}
        </IconButton>
      </Box>
      {isCommentsExpanded && comments.map((comment, index) => (
        <Box key={index} mt={1}>
          <Typography variant="body1" fontWeight="bold">
            {comment.user}
          </Typography>
          <Typography variant="body2">{comment.content}</Typography>
        </Box>
      ))}
      {isCommentsExpanded && (
        <Box mt={2}>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={handleCommentChange}
          />
        </Box>
      )}
      {isCommentsExpanded && (
        <Box mt={1}>
          <Button variant="contained" color="primary" onClick={handleAddComment}>
            Post Comment
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default DiaryItem;

