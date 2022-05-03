const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const pinRoute = require('./routes/pins')


// parses incoming JSON requests, puts parsed data in req.body
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo Connected - Happy Mongo!');
  })
  .catch((err) => console.log(err));

app.use('/api/pins', pinRoute);

app.listen(4000, () => {
  console.log('Nodemon is ready for battle');
})
