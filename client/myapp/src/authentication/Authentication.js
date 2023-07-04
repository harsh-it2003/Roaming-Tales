import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doAuthentication } from "../api-helpers/helpers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';


const Authentication = () => {
  const dispatch = useDispatch();

  const [isLogin, setIslogin] = useState(false);
  const [inputs, setInputs] = useState({ name: "", password: "", email: "" });

  const navigate = useNavigate();

  const notify = (arg) => {
    toast.error("Sorry, couldn't authenticate", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await doAuthentication(isLogin, inputs)
      .then((data) => {
        console.log("success");
        console.log(data);
        dispatch({
          type: "login",
          payload: 1,
        })
        let id = (isLogin ? data._id : data.userDoc._id);
        localStorage.setItem("userId", id);
        localStorage.setItem("showLoginSuccess", true);
        console.log(localStorage.getItem("showLoginSuccess"));
        navigate("/diaries");
      })
      .catch((err) => { console.log(err); notify(0); });
    setInputs({ name: "", password: "", email: "" });
  }


  const handleChange = (e) => {
    setInputs((prevState) => {
      return ({ ...prevState, [e.target.name]: e.target.value });
    })
  }


  return (
    <>
      <ToastContainer />
      <Box sx={{ display: "flex", flexDirection: "row", width: "100vw", height: "92vh", backgroundColor: "black" }}>
        <img src="authenticationPage.jpg" alt="error occured" style={{ width: "100vw", minHeight: "92vh", filter: "brightness(50%)" }} />
        <Box
          sx={{ backgroundColor: "#608b576b", display: "flex", flexDirection: "column", position: "absolute" }} className="responsive-signup"
        >

          <form onSubmit={handleSubmit}>

            <Box
              display="flex"
              flexDirection="column"
              padding={4}
              margin="auto"
              justifyContent={"space-between"}
            >
              <Typography sx={{textAlign:"center",color:"white"}} variant="h3">
                  {isLogin ? "Login" : "Signup"}
              </Typography>

            {!isLogin && <><FormLabel sx={{ fontSize: "3vh", color: "white" }}>Name</FormLabel>

                <TextField sx={{ border: "0.2vh solid white"}} margin="normal" name='name' value={inputs.name} onChange={handleChange}></TextField></>}

              <FormLabel sx={{ fontSize: "3vh", color: "white" }}>Email</FormLabel>

            <TextField sx={{ border: "0.2vh solid white"}} margin="normal" name='email' value={inputs.email} onChange={handleChange}></TextField>

            <FormLabel sx={{ fontSize: "3vh", color: "white" }}>Password</FormLabel>
            
              <TextField sx={{ border: "0.2px solid white"}} margin="normal" type={"password"} name='password' value={inputs.password} onChange={handleChange}></TextField>
            
              <Button sx={{ mt: 4, borderRadius: 10 }} variant="contained" type='submit'>
                {isLogin ? "login" : "signup"}
              </Button>

              <Button sx={{ mt: 2, borderRadius: 10, color: "white", border: "1px solid white" }} onClick={() => setIslogin(!isLogin)}>change to {isLogin ? "signup" : "Login"}</Button>
            </Box>
          </form>



        </Box>

      </Box>
    </>

  );
}

export default Authentication;
