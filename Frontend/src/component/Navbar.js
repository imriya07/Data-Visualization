import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();

  // Detect small & medium screens (mobile & tablets)
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md = 900px

  // State for menu dropdown
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Hide Navbar on the Dashboard page
  if (location.pathname === "/dashboard") {
    return null;
  }

  return (
    <AppBar sx={{ bgcolor: "#1F3F49", padding: "5px 10px" }} position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo (adjusts size on different screens) */}
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            fontWeight: "bold",
            flexGrow: 1
          }}
        >
          Moonshot
        </Typography>

        {/* Show Menu Icon on Mobile & Tablet */}
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose} component={Link} to="/login">
                Login
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/signup">
                Signup
              </MenuItem>
            </Menu>
          </>
        ) : (
          // Buttons for larger screens (Desktop)
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Button
              sx={{
                bgcolor: "#488A99",
                fontSize: "1rem",
                fontWeight: "700",
                padding: "0.5rem 1.5rem",
                "&:hover": { bgcolor: "#357a84" } // Hover effect
              }}
              variant="contained"
              to="/login"
              component={Link}
            >
              Login
            </Button>
            <Button
              sx={{
                bgcolor: "#D32D41",
                fontSize: "1rem",
                fontWeight: "700",
                padding: "0.5rem 1.5rem",
                "&:hover": { bgcolor: "#b02133" }
              }}
              variant="contained"
              to="/signup"
              component={Link}
            >
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
