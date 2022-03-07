const express = require('express')
const db = require('./models/db');
const userRouter = require('./routers/user.router');
const contactRouter = require('./routers/contact.router');
const chatRoomRouter = require('./routers/chatRoom.router');
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
  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on('chat', (msg) => {
    console.log('message: ' + msg.message);
    io.emit('chat', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})