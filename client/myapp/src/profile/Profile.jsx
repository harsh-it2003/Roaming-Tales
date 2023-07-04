import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getUserById } from "../api-helpers/helpers"
import DiaryItem from '../diaries/DiaryItem';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';

const Profile = () => {

  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(userId)
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const dispatch = useDispatch();

  useSelector((state) => {
    return state.tabReducer.tabNo;
  })


  const logout = () => {
    dispatch({
      type: "logout",
      payload: 1,
    });
    localStorage.removeItem("userId");
    navigate("/");
  }


  return (
    <>
      <Card sx={{ minHeight: "92vh", display: "flex", flexDirection: "column", backgroundColor: "#6B5B95" }}>
        <Box>
          <CardActionArea sx={{ display: "flex", flexDirection: "column", textAlign: "center", height: "60vh" }}>
            <CardMedia
              component="img"
              image={`https://api.multiavatar.com/${user.name}.png`}
              alt="green iguana"
              sx={{ height: "20vh", width: "auto", mt: 2 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="white">
                {user.name}
              </Typography>
              <Typography variant="body2" color="white">
                {user.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button sx={{ mr: "auto", textAlign: "center", minWidth: "15%", margin: "0.5%", backgroundColor: "#2E4A62" }} variant="contained" onClick={logout}>
                Logout
              </Button>
            </CardActions>
          </CardActionArea>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          {user.posts && user.posts.map((item, ind) => {
            return (<DiaryItem
              date={new Date(`${item.date}`).toLocaleDateString()}
              title={item.title}
              image={item.image}
              location={item.location}
              description={item.description}
              id={item._id}
              key={ind}
              user={user}
              bc={"#CBC3E3"}
            />);
          })}
        </Box>
      </Card>
    </>
  )
}


export default Profile;


