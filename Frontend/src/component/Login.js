import React, { useState } from 'react';
import { Grid, Paper, TextField, Typography, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';

const Login = () => {
  const heading = { fontSize: "2rem", fontWeight: "600" };
  const paperStyle = { padding: "2rem", margin: "60px auto", borderRadius: "1rem", boxShadow: "7px 7px 7px" };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", backgroundColor: "#488A99", borderRadius: "0.5rem" };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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

        // Get current URL filters
        const currentParams = new URLSearchParams(window.location.search);
        const queryString = currentParams.toString(); // Preserve filters

        // Redirect to dashboard with filters
        window.location.replace(`/dashboard${queryString ? `?${queryString}` : ""}`);
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={row}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" variant="contained" style={btnStyle}>
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
