import React from "react";
import { AppBar, Typography, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get the current route
  const button = { marginRight: "20px", fontSize: "1rem", fontWeight: "700", padding: "0.3rem 1.4rem" };

  // Check if the current route is the dashboard
  if (location.pathname === '/dashboard') {
    return null; // Don't render Navbar on dashboard page
  }

  return (
    <>
    <AppBar sx={{bgcolor:'#1F3F49'}}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>Moonshot</Typography>
        <Button style={button} sx={{bgcolor:'#488A99'}} color="success" variant="contained" to="/login" component={Link}>Login</Button>
        <Button style={button} sx={{bgcolor:'#D32D41'}} variant="contained" to="/signup" component={Link}>Signup</Button>
        {/* <Logout /> */}
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Navbar;
