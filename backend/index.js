require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authenticationRoute = require("./Routes/authentication");
const PORT = 5000;
require("./Config/dbConnect");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/users", authenticationRoute);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} ...`);
});
