const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

// Create the server
const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set("view engine", "ejs");

io.on("connection", function (socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data})
    })
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
});

// Route for home page
app.get('/', function (req, res) {
    res.render("index");
});

// Start the server
server.listen(3000, function () {
    console.log('Server is running on port 3000');
});
