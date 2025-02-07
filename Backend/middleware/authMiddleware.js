const jwt = require('jsonwebtoken');

// exports.authenticateToken = (req, res, next) => { 
//   const authHeader = req.headers['authorization']; 
//   // Check both Authorization header and cookie 
//   const token = (authHeader && authHeader.split(' ')[1]) || req.cookies?.token; 
 
//   if (!token) return res.sendStatus(401); 
 
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => { 
//     if (err) return res.sendStatus(403); 
//     req.user = user; 
//     next(); 
//   }); 
// };


exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.split(' ')[1]) || req.cookies?.token;

  if (!token) {
    console.log("No token found in request");  // Debug log
    return res.sendStatus(401);  // Unauthorized if no token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);  // Debug log
      return res.sendStatus(403);  // Forbidden if invalid token
    }
    req.user = user;  // Token is valid, continue with request
    next();
  });
};