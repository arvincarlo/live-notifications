Socket Server

1. 
- Sending event to the client
use io 

- to send in every client
use io.emit 

- to send in one client
use io.to(socketId).emit

2. Take event from client
- use socket.on



Client Side
Send evet to server
- use socket.emit

Take event from server
- use socket.on