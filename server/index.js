// const io = require('socket.io')(8000)
// const users={};
// io.on('connection',socket=>{
//     socket.on('new-user-joined',name=>{
//         users[socket.id]=name;
//         socket.broadcast.emit('user-joined',name);
//     });
//     socket.on('send',message=>{
//         socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
//     })
// })

const express = require('express');
const socketio = require('socket.io');

const cors = require('cors');


const app = express();
// app.use(cors({ origin: '*' }));
app.use(cors());
const users={};



app.get('/', (req, res) => {
    res.send('Hi from Codedamn')
});

const server = app.listen(1337, () => {
    console.log('Server running!')
});

const io = socketio(server)

io.on('connection', (socket) => {
    socket.on('new-user-joined',name=>{
        console.log('new user', name);
                users[socket.id]=name;
                socket.broadcast.emit('user-joined',name);
            });
            socket.on('send',message=>{
                socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
            })
})
