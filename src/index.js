const express = require('express')
const db = require('./models/db');
const userRouter = require('./routers/user.router');
const contactRouter = require('./routers/contact.router');
// const {getUser} = require('./services/auth');

db.connect();

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRouter);
app.use('/contact', contactRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
  // getUser();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})