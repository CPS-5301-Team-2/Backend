require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI);
const users = require("./model/users");

// Express Configs
app.set('view engine', 'ejs');

var indexRouter = require("./routes/index");

//index router
app.use("/", indexRouter);


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