// node server which will handle socket.io connection
const io = require('socket.io')(8000) //This line imports the socket.io library and creates a new Socket.IO instance by passing it an HTTP server. It will listen for connections on port 8000.
const users={}; //This initializes an empty JavaScript object users that will be used to store information about connected users. Each user will be associated with a unique socket ID.

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
})
