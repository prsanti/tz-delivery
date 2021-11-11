const jwt = require('jsonwebtoken');

// Verifies that the token matches the user
const checkToken = (req, res, next) => {
  // Gets a token from the header
  const token = req.headers["x-access-token"];
  if (token) {
    // verifies the token received
    jwt.verify(token, "bigSecret", (err, decoded) => {
      if (err) {
        res.status(401).json({message: "Access Denied"});
        return;
      } else {
        // Sets the user's ID from the decoded token
        req.userID = decoded.userID;
        next();
      }
    });
  } else {
    res.status(401).json({message: "Access Denied"});
  }
};

module.exports = {
  checkToken,
};