const express = require('express');
const http = require('http'); // Built-in module
const socketIO = require('socket.io')
const cors = require('cors');

const app = express();

const server = http.createServer(app);

// New socket connection
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
})

app.use(cors("*"));

app.use(express.json());

let onlineUsers = [];

const addNewUser = (username, socketId) => {
    !onlineUsers.some((user)=>user.username === username) && onlineUsers.push({username, socketId})
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
}

const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
}

io.on('connection', (socket) => {
    console.log('New client connected');

    console.log("Socket ID: ", socket.id);

    socket.on('newUser', (username) => {
        addNewUser(username, socket.id)
        console.log(onlineUsers)
    });

    socket.on("sendNotification", ({senderName, receiverName, type, message}) => {
        const receiver = getUser(receiverName);
        io.to(receiver?.socketId).emit("getNotification", {
            senderName,
            message,
        })

        // Push the message to the client
        io.to(receiver?.socketId).emit('pushNotification', {
            senderName,
            message,
        });
    });
    

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        removeUser(socket.id);
    });
})

server.listen(8001, () => {
    console.log('Server is running on port 8001');
})
