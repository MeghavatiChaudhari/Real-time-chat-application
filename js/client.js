const socket = io('http://localhost:1337');

const form = document.getElementById('send-container');
const  messageInput= document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')

const x = prompt('enter your name to join');
socket.emit('new-user-joined',x)