import React from 'react'
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import "../App.css";
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const navigate=useNavigate();

    useSelector((state) => {
        console.log(state.tabReducer);
        return state.tabReducer;
    });

    const dispatch = useDispatch();

    dispatch({
        type: "changeColor",
        action: "#EDF1FF",
    });

    return (
        <div style={{minHeight:"92vh"}} className="responsive-home-body">
            <Box width="100%" height="92vh" position="relative">
                <img src="homepage.jpg" alt="error" width={"100%"} height={"75%"} />

                <Typography position={"absolute"} top={"0px"} fontFamily={"Dancing Script,cursive"} variant={"h2"} textAlign={"center"} width={"100%"} fontWeight={"bold"} color={"#18423ca3"}>Not all those who wander are lost</Typography>

                <Box width={"100%"} height={"25%"} display={"flex"} flexDirection={"column"}>
                    <p style={{fontSize:"4vh",fontFamily:"Merriweather", textAlign:"center"}} className="responsive-lowerBoxes">SHARE YOUR TRAVEL DIARIES</p>
                    <div style={{textAlign:"center"}}>
                        <Button variant='contained' color='primary' sx={{ width: "13rem",mb:3}} onClick={()=>{dispatch({type:"changeTabNo",payload:2,});(localStorage.getItem("userId")?navigate("/add"):navigate("/authentication"));}}>Share your story</Button>
                        <span className='responsive-theLastButton'><Button variant='contained' color="primary" sx={{ width: "13rem",mb:3}} onClick={()=>{navigate("/diaries");}}>View Diaries</Button></span>
                    </div> 
                </Box>
            </Box>
        </div>
    );
}

export default Home;














