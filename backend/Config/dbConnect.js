require("dotenv").config();
const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(dbUrl).then(() => {
      console.log("DB Connected ..");
    });
  } catch (error) {
    console.log(error.message);
  }
};
dbConnect();
