require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;

function setUser(user) {
  return jwt.sign({ id: user._id, email: user.email }, secretKey);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secretKey);
}

module.exports = {
  setUser,
  getUser,
};
