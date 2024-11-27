const express = require("express");
const {
  loginController,
  registerController,
  adminDashBoardController,
  studentDashBoardController,
} = require("../Controller/user");
const router = express.Router();

const protect = require("../middleware/auth");
const adminAuth = require("../middleware/adminMiddleware");

router.route("/").get(protect, studentDashBoardController);
router.route("/admin").get(protect, adminAuth, adminDashBoardController);
router.route("/login").post(loginController);
router.route("/register").post(registerController);

module.exports = router;
