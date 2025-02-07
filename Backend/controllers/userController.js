const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Add expiration for security

    // Set token in cookie
    res.cookie('token', token, { 
      httpOnly: true,  // Ensure JS can't access the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (https)
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Cross-site cookies in production
    });

    // Send response with token in JSON as well
    res.json({ token, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, {  
//       httpOnly: true,  
//       secure: process.env.NODE_ENV === 'production',  
//       sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' 
//     }).json({ token, message: 'Logged in successfully' })
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };