const io = require('socket.io')(3000, {
  cors: {
    origin: ['http://localhost:8080'], // Solve CORS issue by giving an array  of allowed domain names
  },
});
io.on('connection', (socket) => {
  console.log(socket.id); //Print the Random ID given to a Socket
  socket.on('send-message', (string, roomnumber, object) => {
    // send any number of argument and receive any number
    console.log(string, roomnumber, object);
    if (roomnumber === '') {
      // io.emit('receive-message', string);//Multi cast message to every receiver
      socket.broadcast.emit('receive-message', string); // send to everyone but yourself
    } else {
      socket.to(roomnumber).emit('receive-message', string); // send to specific socket only
      // broadcast function is implicity applied
    }
  });
  socket.on('join-room', (room) => {
    socket.join(room); //Join a Specific Room by binding two or more sockets to a particular socket label???
    // a particular socket can be a part  of multiple rooms as well
  });
});
