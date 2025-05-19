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

// app.post('/send', (request, response) => {
//     const message = request.body.message;
//     console.log(message);

//     // Emit the message to all connected clients
//     io.emit('pushNotification', {
//         message
//     });

//     response.status(200).send({
//         message: 'Message sent successfully'
//     });

//     io.on('connection', (socket) => {
//         console.log('New client connected');

//         socket.on('disconnect', () => {
//             console.log('Client disconnected');
//         });
//     })
// })

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
})

server.listen(8001, () => {
    console.log('Server is running on port 8001');
})
