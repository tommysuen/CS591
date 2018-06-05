//Author: Tommy Suen U77227951
//CS591 Assignment 1
//Professor Donham

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//Mongoose Setup
mongoose.connect('mongodb://localhost:27017/db');
mongoose.connection.on('connected', () =>{
    console.log('DB Connected')
});

//Sets up Router
const indexRouter = require('./routes/index');
const HWRouter = require('./routes/hw1');
const HW2Router = require('./routes/hw2');
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Sets up Route paths
app.use('/', indexRouter);
app.use('/hw1', HWRouter);
app.use('/hw2', HW2Router);

module.exports = app;
