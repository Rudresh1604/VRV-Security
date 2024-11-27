const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const jwtKey = process.env.JWT_KEY;

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtKey);
    req.user = await User.findById(decoded.userId).select("-password");
    if (req.user.role !== "admin") {
      return res.status(400).send("Only admins can access this page");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send("Not authorized Please login");
  }
};
module.exports = adminAuth;
