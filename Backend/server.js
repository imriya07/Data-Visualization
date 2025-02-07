const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Correct CORS Setup: Allow credentials and specify origin
app.use(cors({
  origin: 'https://frontend-nu-wine.vercel.app',  // Allow React app origin
  credentials: true,                // Allow cookies/auth headers
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Ensure the proper HTTP methods
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 8000;
if(process.env.NODE_ENV !== "production"){
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;