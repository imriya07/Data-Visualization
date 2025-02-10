import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUP = () => {
  const heading = { fontSize: "2rem", fontWeight: "600" };
  const paperStyle = { padding: "2rem", margin: "20px", borderRadius: "1rem", boxShadow: "7px 7px 7px" };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", backgroundColor: "#D32D41", borderRadius: "0.5rem" };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Email Validation
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Password Validation
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError("Password must be at least 8 characters, include an uppercase, lowercase, number & special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (emailError || passwordError) return; // Prevent submission if errors exist

    axios
      .post("https://backend-theta-plum-15.vercel.app/api/users/register", { name, email, password })
      .then((result) => {
        if (result.status === 201) {
          console.log("User Created Successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("Email already exists. Please use a different email.");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <>
      <Grid align="center">
        <Paper
          style={paperStyle}
          sx={{
            width: {
              xs: "80vw",
              sm: "50vw",
              md: "40vw",
              lg: "30vw",
              xl: "20vw",
            },
            height: "80vh",
          }}
        >
          <Typography style={heading}>Signup</Typography>
          <form onSubmit={handleSignup}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              name="name"
              required
              sx={{ label: { fontWeight: "500", fontSize: "1.2rem" } }}
              style={row}
              label="Enter Name"
              type="text"
            />
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              name="email"
              required
              error={!!emailError}
              helperText={emailError}
              sx={{ label: { fontWeight: "500", fontSize: "1.2rem" } }}
              style={row}
              label="Enter Email"
              type="email"
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              name="password"
              required
              error={!!passwordError}
              helperText={passwordError}
              sx={{ label: { fontWeight: "500", fontSize: "1.2rem" } }}
              style={row}
              label="Enter Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" style={btnStyle} disabled={!!emailError || !!passwordError}>
              SignUP
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default SignUP;
