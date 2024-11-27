require("dotenv").config();
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const { use } = require("../Routes/authentication");
const jwtKey = process.env.JWT_KEY;

const registerController = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);

  try {
    if (!name || !email || !password) {
      return res.status(400).send("Please enter all fields");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Required email and password");
    }
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      let token = jwt.sign({ userId: user._id }, jwtKey, {
        expiresIn: "3hr",
      });
      res.cookie("token", token, {
        maxAge: 3 * 60 * 1000,
        httpOnly: true,
      });
      token = jwt.sign({ userId: user._id, role: user.role }, jwtKey, {
        expiresIn: "3hr",
      });
      return res.status(200).send({
        message: "Log in successfully",
        data: {
          name: user.name,
          role: user.role,
          pic: user.pic,
          token: token,
        },
      });
    }
    return res.status(401).send("Invalid Email or Password");
  } catch (error) {
    console.log(error);

    return res.status(401).send(error.message);
  }
};

const studentDashBoardController = async (req, res) => {
  try {
    return res.status(200).send("Welcome to student dashboard");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const adminDashBoardController = async (req, res) => {
  try {
    return res.status(200).send("Welcome to admin Dashboard ");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  registerController,
  loginController,
  studentDashBoardController,
  adminDashBoardController,
};
