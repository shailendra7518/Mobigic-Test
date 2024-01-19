const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    throw "Unauthorized: No token provided";
  }

  try {
    const secretKey = process.env.JWT_SECKRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    throw "Unauthorized: No token provided";
  }
};

module.exports = authMiddleware;
