const express = require('express')
const db = require('./models/db');
const userRouter = require('./routers/user.router');
const contactRouter = require('./routers/contact.router');
const chatRoomRouter = require('./routers/chatRoom.router');
const {addNewMessage, deleteMessage, deleUnSeen} = require('./services/message');
const {addRoom} = require('./services/room');
const {sendNoti} = require('./services/auth');
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

let userOnline = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  // io.use((socket, next) => {
  //   const token = socket.handshake.auth.token;
  //   console.log(token)
  //   const err = new Error("not authorized");
  //   err.data = { content: "Please retry later" }; // additional details
  //   next();
  // });
  const userOnlineRoom = [];

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
    const emailRegexr = /^\w[\w\d\.]+@[\w\.]+\w$/
    socket.rooms.forEach(item => {
      if (item.match(emailRegexr)) {
        userOnlineRoom.push(item);
      }
    })
    userOnline.push(...userOnlineRoom);
    io.to(userOnline).emit('userOnline', userOnline);
  });

  socket.on('chat', async (msg) => {
    const newMessage = await addNewMessage(msg.room, msg.message);
    console.log("new messages", newMessage);
    await sendNoti(msg.fcmToken, msg.message, msg.room);
    io.to(msg.room).emit('chat', {room: msg.room, message: newMessage});
  });

  socket.on('delete', async (msg) => {
    const oldMessage = await deleteMessage(msg.room, msg.message);
    console.log("old messages", oldMessage);
    io.to(msg.room).emit('delete', {room: msg.room, message: oldMessage});
  });

  socket.on('deleteUnSeen', async (msg) => {
    await deleUnSeen(msg.room, msg.email);
  });

  socket.on('addRoom', async (msg) => {
    const newChatRoom = await addRoom(msg.room);
    console.log("new chat room", newChatRoom);
    if (newChatRoom) {
      io.to(newChatRoom.email).emit('addRoom', newChatRoom);
    }
  })

  socket.on('disconnect', () => {
    const userOnlineCurrent = userOnline.filter(item => !userOnlineRoom.includes(item));
    io.to(userOnline).emit('userOnline', userOnlineCurrent);
    userOnline = userOnlineCurrent;
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})