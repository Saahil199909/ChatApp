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
    // origin: 'http://192.168.1.47:5173',
    origin: 'https://chat-app-mern-cyan-eight.vercel.app',
    methods: ['GET', 'POST'],
  }
});  

require("dotenv").config();

app.use(express.json());  
app.use(cors());
app.use('/api/users', userRouter)
app.use('/api/chat', chatRouter)

const port = process.env.PORT || 5000;

httpServer.listen(port, (req, res) => {
  console.log(`server running on port: ${port}`);
});

const uri = process.env.MONGODB_ATLAS_URI;
mongoose.connect(uri, {
  family: 4,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.error("MongoDB connection error:", error));


// Import socket events after setting up the server and routes
require('./socket/socketController.js')(io);  

