const express = require("express");
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require('./Routes/userRouter')
const chatRouter = require('./Routes/chatRouter')

// Create express app
const app = express();

// Create HTTP server
const httpServer = http.createServer(app);  

 // Create Socket.IO server and cors 
const io = new Server(httpServer,{            
  cors: {
    // origin: 'http://localhost:5173',
    origin: 'http://192.168.1.47:5173',
    // origin: 'http://192.168.0.106:5173',
    methods: ['GET', 'POST'],
  }
});  

require("dotenv").config();

app.use(express.json());  
app.use(cors());
app.use('/api/users', userRouter)
app.use('/api/chat', chatRouter)

const port = process.env.PORT || 5000;
const uri = 'mongodb://localhost:27017/chatRoom';

// httpServer.listen(port, '192.168.1.47', (req, res) => {
//   console.log(`server running on port: ${port}`);
// });

httpServer.listen(port, '192.168.1.47', (req, res) => {
  console.log(`server running on port: ${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log(`MongoDB connection established succesfully`))
  .catch((error) => console.log(`MongoDB connection FAILED: ${error.message}`));

// Import socket events after setting up the server and routes
require('../socket/socketController.js')(io);  

