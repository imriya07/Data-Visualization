import React, { useState } from 'react'; 
import { Grid, Paper, TextField, Typography, Button } from "@mui/material"; 
import axios from 'axios'; 
 
const Login = () => { 
  const heading = { fontSize: "2rem", fontWeight: "600" }; 
  const paperStyle = { padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "7px 7px 7px" }; 
  const row = { display: "flex", marginTop: "2rem" }; 
  const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", backgroundColor: "#488A99", borderRadius: "0.5rem" }; 
 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://backend-theta-plum-15.vercel.app/api/users/login',
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Login Successful");
        // Replace the current entry with the dashboard
        window.location.replace('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid credentials. Please try again.');
      } else {
        console.error(error);
      }
    }
  };
  
 
  return ( 
    <Grid align="center"> 
      <Paper style={paperStyle} sx={{ 
        width: { xs: "80vw", sm: "50vw", md: "40vw", lg: "30vw", xl: "20vw" }, 
        height: '68vh' 
      }}> 
        <Typography style={heading}>Login</Typography> 
        <form onSubmit={handleLogin}> 
          <TextField  
            required  
            label="Enter Email"  
            type="email"  
            value={email} 
            onChange={(e) => setEmail(e.target.value)}  
            style={row}  
          /> 
          <TextField  
            required  
            label="Enter Password"  
            type="password"  
            value={password} 
            onChange={(e) => setPassword(e.target.value)}  
            style={row}  
          /> 
          <Button type="submit"  variant="contained" style={btnStyle}> 
            Login 
          </Button> 
        </form> 
      </Paper> 
    </Grid> 
  ); 
}; 
 
export default Login;