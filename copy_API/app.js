// lib
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


// routes
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test/test_router');

//CORS 전처리
var app = express();
app.use(cors({
    origin: true
}))

// logger, encoder, cookieParser, public 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// index router
app.use('/', indexRouter);




module.exports = app;
