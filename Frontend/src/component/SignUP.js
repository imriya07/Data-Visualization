import React, { useState } from 'react'
import {Grid, Paper,TextField,Typography,Button} from "@mui/material";
import axios from "axios"
import {useNavigate} from "react-router-dom"

const SignUP = () => {
  const heading ={fontSize:"2rem", fontWeight:"600"}
  const paperStyle ={padding:"2rem", margin:"100px", borderRadius:"1rem",boxShadow:"7px 7px 7px"}
  const row = {display:"flex",marginTop:"2rem"}
  const btnStyle = {marginTop:"2rem", fontSize:"1,2rem",backgroundColor:"#D32D41", borderRadius:"0.5rem"}

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSignup = (e) =>{
    e.preventDefault();
    axios.post("http://backend-theta-plum-15.vercel.app/api/users/register", { name, email, password })
    .then(result =>{
      if(result.status === 201){
        console.log("User Created Succefully");
        navigate("/login");
      }
    })
    .catch(err =>{
      if(err.response && err.response.status === 400){
        window.alert("Email already exits. Please use a diffrent email");
      }else{
        console.log(err)
      }
    })
  }

  return (
    <>
    <Grid align="center">
      <Paper style={paperStyle} sx={{width:{
        xs:"80vw",
        sm:"50vw",
        md:"40vw",
        lg:"30vw",
        xl:"20vw"
      },height: '80vh' }}>
        <Typography style={heading}>Signup</Typography>
        <form onSubmit={handleSignup}>
          <TextField onChange={(e) => setName(e.target.value)} name='name' required sx={{label:{fontWeight:"500", fontSize:"1.2rem"}}} style={row} label = "Enter Name" type='text'></TextField>
          <TextField onChange={(e) => setEmail(e.target.value)} name='email' required sx={{label:{fontWeight:"500", fontSize:"1.2rem"}}} style={row} label ="Enter Email" type='email'></TextField>
          <TextField onChange={(e) => setPassword(e.target.value)} name='password' required sx={{label:{fontWeight:"500", fontSize:"1.2rem"}}} style={row} label ="Enter Password" type='password'></TextField>
          <Button type='submit' variant='contained' style={btnStyle}>SignUP</Button>
        </form>
      </Paper>
    </Grid>
    </>
  )
}

export default SignUP