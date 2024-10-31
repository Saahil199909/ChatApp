const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require('./Routes/userRouter')

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter)

const port = process.env.PORT || 5000;
const uri = 'mongodb://localhost:27017/chatRoom';

app.listen(port, (req, res) => {
  console.log(`server running on port: ${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log(`MongoDB connection established succesfully`))
  .catch((error) => console.log(`MongoDB connection FAILED: ${error.message}`));
