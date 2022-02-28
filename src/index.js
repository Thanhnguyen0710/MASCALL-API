const express = require('express')
const db = require('./models/db');
const {getUser} = require('./services/auth');

db.connect();

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require('./routers/user.router');

app.use('/user', userRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
  // getUser();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})