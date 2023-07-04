import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailsOfAPost, updatePost } from "../api-helpers/helpers";
import { Box, FormLabel, TextField, Typography, Button } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useState } from 'react';



const EditPost = () => {
    console.log("edit post");
  const navigate=useNavigate();


    const postId = useParams().id;
    const [inputs,setInputs]=useState({title:"",description:"",imageURL:"",location:"",date:""});

    useEffect(() => {
        getDetailsOfAPost(postId)
            .then((data)=>{
                setInputs({
                    title:data.post.title,
                    description:data.post.description,
                    imageURL:data.post.image,
                    location:data.post.location,
                    date:data.post.date,
                });
            })
            .catch(err => console.log(err));
    },[postId]);

    const handleChange = (event) => {
        setInputs((prev) => {
            return ({
                ...prev,
                [event.target.name]: event.target.value,
            })
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(inputs);
            await updatePost(postId,inputs)
            .then((data)=>console.log(data))
            .catch(err=>console.log(err));
            navigate("/diaries");
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#95DEE3", minHeight: "92vh", width: "100%" }}>
                <Box display="flex" marginLeft={"auto"} marginRight={"auto"} padding={4}>
                    <Typography variant="h3" fontFamily={"Dancing Script"} margin="auto">
                        Edit Your Travel Blog
                    </Typography>;
                    <TravelExploreIcon sx={{ fontSize: 50, paddingLeft: 1, color: "Green" }} />
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box display={"flex"} flexDirection={"column"} padding={3} width={"80vw"} margin="auto">
                        <FormLabel sx={{fontSize:"2.5vh"}} >Title</FormLabel>
                        <TextField margin="normal" variant='standard' onChange={handleChange} name='title' value={inputs.title}/>
                        <FormLabel sx={{fontSize:"2.5vh"}}>Description</FormLabel>
                        <TextField margin="normal" variant="standard" onChange={handleChange} name='description' value={inputs.description} />
                        <FormLabel sx={{fontSize:"2.5vh"}}>Image URL</FormLabel>
                        <TextField margin="normal" variant='standard' onChange={handleChange} name='imageURL' value={inputs.imageURL} />
                        <FormLabel sx={{fontSize:"2.5vh"}}>Location</FormLabel>
                        <TextField margin="normal" variant='standard' onChange={handleChange} name='location' value={inputs.location} />
                        <FormLabel sx={{fontSize:"2.5vh"}} >Date</FormLabel>
                        <TextField margin="normal" variant='standard' onChange={handleChange} name='date' value={inputs.date} />
                        <Button variant='contained' sx={{ width: "50%", margin: "auto", mt: 3, backgroundColor: "green", borderRadius: 7 }} type="submit">Post</Button>
                    </Box>
                </form>

            </Box>

        </>
    )
}

export default EditPost;