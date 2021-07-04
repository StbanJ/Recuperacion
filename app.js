var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/estudiantes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/students', studentsRouter);

module.exports = app;
