import React from 'react';
import { Box, FormLabel, TextField, Typography, Button } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useState } from 'react';
import { postAPost } from '../api-helpers/helpers';
import { useNavigate } from 'react-router-dom';



const Add = () => {
  const [inputs,setInputs]=useState({title:"",description:"",imageURL:"",location:"",date:""});
  const navigate=useNavigate();

  const handleChange=(event)=>{
    setInputs((prev)=>{
      return ({
        ...prev,
        [event.target.name]:event.target.value,
      })
    })
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
    postAPost(inputs)
    .then((data)=>{
      console.log(data);
      navigate("/diaries");
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#95DEE3", minHeight: "92vh", width: "100%" }}>
        <Box display="flex" marginLeft={"auto"} marginRight={"auto"} padding={4}>
          <Typography variant="h3" fontFamily={"Dancing Script"} margin="auto">
            Add Your Travel Blog
          </Typography>;
          <TravelExploreIcon sx={{fontSize:50, paddingLeft:1, color:"Green"}}/>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box display={"flex"} flexDirection={"column"} padding={3} width={"80vw"} margin="auto">
            <FormLabel sx={{fontSize:"2.3vh"}}>Title</FormLabel>
            <TextField margin="normal" variant='standard' onChange={handleChange} name='title' value={inputs.name}/>
            <FormLabel sx={{fontSize:"2.3vh"}}>Description</FormLabel>
            <TextField margin="normal" variant="standard" onChange={handleChange} name='description' value={inputs.description}/>
            <FormLabel sx={{fontSize:"2.3vh"}}>Image URL</FormLabel>
            <TextField margin="normal" variant='standard' onChange={handleChange} name='imageURL' value={inputs.imageURL}/>
            <FormLabel sx={{fontSize:"2.3vh"}}>Location</FormLabel>
            <TextField margin="normal" variant='standard' onChange={handleChange} name='location' value={inputs.location}/>
            <FormLabel sx={{fontSize:"2.3vh"}} >Date</FormLabel>
            <TextField margin="normal" variant='standard' onChange={handleChange} name='date' value={inputs.date}/>
            <Button variant='contained' sx={{width:"50%", margin:"auto",mt:3, backgroundColor:"green", borderRadius:7}} type="submit">Post</Button>
          </Box>
        </form>

      </Box>

    </>
  )
}

export default Add;