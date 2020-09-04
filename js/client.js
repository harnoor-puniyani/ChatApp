//connecting to the Nodeserver
const socket =io('http://localhost:8000');
//asssigning to the node variables for  controlability of it.
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// applying notification audio!
var audio = new Audio('juntos.mp3');

// function which will append info to the container!
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
//this event helps submit the form or better say sending the messages
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''

})
// the prompt takes in the name of the users
const name = prompt('Enter your Name to join');
socket.emit('new-user-joined',name)
// this will give a text-message whenever the user enters , wuthout notification
socket.on('user-joined', name=>{
append(`${name} joined the chat`,'right'); 
}) 
// the format of how to receive the text messages from other chat members
socket.on('receive',data =>{
    append(`${data.name} : ${data.message}`,'left');
}) 
//the format of receiving text messages whenever someone leaves the chat.
socket.on('left' , name=>{
    append(`${name} left the chat`,'right');
} )

