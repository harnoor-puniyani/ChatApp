// Node server which will handle all socket io connections

const io=require('socket.io')(8000)

const users = {}

io.on('connection',socket =>{
    //Listening for new users to join!
    socket.on('new-user-joined' , name=>{
        // console.log("New User",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
        // Event used for sending new messages to the chat group
        socket.broadcast.emit('receive',{message : message , name :users[socket.id]})
    });

    socket.on('disconnect', message =>{
        // listening for connections or whenever someone leaves the chat window!
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
}) 