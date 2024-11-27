const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const jwtKey = process.env.JWT_KEY;

const protect = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, jwtKey);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log(req.user);
      next();
    } else {
      return res.status(400).send("Not authorized Please login");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Not authorized Please login");
  }
};
module.exports = protect;
