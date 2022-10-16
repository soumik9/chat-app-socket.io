const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { readdirSync } = require("fs");
const morgan = require("morgan");
const colors = require('colors');
const { Server } = require("socket.io");
const http = require('http');

const httpServer = http.createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin:['http://localhost:3000']
  }
})

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// requires / database connection
const connection = require("./db");
(async () => await connection())();

// all routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// socket new connection
io.on("connection", (socket) => {
  // console.log("Socket connection is ready");

  socket.on('send-message', (data) => {
    socket.emit('message-form-server', data);
    console.log('working', data)
  })
})

// port listening
const startServer = (port) => {
    try {
      httpServer.listen(port, () => {
        console.log(colors.magenta(`Server running: http://localhost:${port}/api`));
      });
    } catch (error) {
      console.error(error);
      process.exit();
    }
  };
startServer(process.env.PORT || 5000);