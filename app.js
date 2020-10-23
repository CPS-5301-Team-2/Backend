require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
const InitiateMongoServer = require("./dbconfig");
const expressValidator  = require('express-validator'); //npm install express-validator@5.3.0

const port = process.env.PORT || 3001;

InitiateMongoServer();

//router path
var indexRouter = require("./routes/index");
var adminList = require("./routes/api/listget");
var auth = require("./routes/auth.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(expressValidator());

//index router
app.use("/", indexRouter);
app.use("/list", adminList);
app.use("/auth", auth);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(process.env.PORT, ()=>{
    console.log(`http://localhost:${port}`);
});

module.exports = app;