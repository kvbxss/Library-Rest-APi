const express = require('express');
require('dotenv/config');
const app = express();
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');


//Middleware
app.use(bodyParser.json());

//Import routes

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use('/posts', postsRoute);
app.use('/user', userRoute);

//ROUTES

app.get('/', (req,res, next) => {

    res.send("Strona Główna")
});



//Connect To DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true},
()=> console.log('connected'))

app.listen(3000);

// Errors 
app.use((req, res, next) => {
    const error = new Error('Can not find');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message });
  });

  module.exports = app;

