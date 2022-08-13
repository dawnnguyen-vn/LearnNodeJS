const jwt = require("jsonwebtoken");
require("dotenv").config({ path: `${__dirname}/../../../.env` });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.json({ status: 400, message: "No authorization header!" });
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = verified.userId;
    next();
  } catch (error) {
    res.json({ status: 400, message: "Invalid jwt token!" });
  }
};

module.exports = verifyToken;
