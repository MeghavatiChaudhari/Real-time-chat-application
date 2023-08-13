

const socket = io('http://localhost:1337');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")

var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if (position == 'left')
        audio.play();
}

const urlParams = new URLSearchParams(window.location.search);
const resetUsername = urlParams.has('reset');

if (!resetUsername) {
    const storedName = sessionStorage.getItem('username'); 
    if (!storedName) {
        const name = prompt("Enter your name to join");
        sessionStorage.setItem('username', name); 
        socket.emit('new-user-joined', name);
    } else {
        socket.emit('new-user-joined', storedName);
    }
} else {
    const name = prompt("Enter your name to join");
    sessionStorage.setItem('username', name); 
    socket.emit('new-user-joined', name);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

socket.on('user-joined', name => {
    append(`${name} Joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})

