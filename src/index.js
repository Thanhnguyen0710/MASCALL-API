const express = require('express')
const db = require('./models/db');
const userRouter = require('./routers/user.router');
const contactRouter = require('./routers/contact.router');
const chatRoomRouter = require('./routers/chatRoom.router');
const {addNewMessage} = require('./services/message');
db.connect();

const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter);
app.use('/contact', contactRouter);
app.use('/chatroom', chatRoomRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

io.on('connection', (socket) => {
  console.log('a user connected');
  // io.use((socket, next) => {
  //   const token = socket.handshake.auth.token;
  //   console.log(token)
  //   const err = new Error("not authorized");
  //   err.data = { content: "Please retry later" }; // additional details
  //   next();
  // });

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on('chat', async (msg) => {
    // console.log('message: ' + msg.message);
    const newMessage = await addNewMessage(msg.room, msg.message);
    console.log("new messages", newMessage);
    io.to(msg.room).emit('chat', {room: msg.room, message: newMessage});
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})