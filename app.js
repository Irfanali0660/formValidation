var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose')
const env=require('dotenv')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

env.config()
var app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Database connected... ['+process.env.MONGO_URL+']')
  }).catch((err)=>{
    console.log(err)
  })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', indexRouter);
app.use('/', usersRouter);

module.exports = app;
