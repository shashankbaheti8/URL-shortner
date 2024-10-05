const jwt = require("jsonwebtoken");
const secretKey = "Shashank@08052002#";

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
