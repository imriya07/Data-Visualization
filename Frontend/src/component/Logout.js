import React from 'react';
import { Button } from '@mui/material';

const Logout = () => {
  const buttonStyle = {
    marginRight: '163px',
    fontSize: '1rem',
    padding: '0.3rem 1.4rem',
  };
  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('userToken');
    // Replace the current entry with the login page
    window.location.replace('/login');
  };
  

  return (
    <Button
      style={buttonStyle}
      // variant="contained"
      // color="error"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
