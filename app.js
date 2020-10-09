require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;


var indexRouter = require("./routes/index");

//index router
app.use("/", indexRouter);



app.listen(process.env.PORT, ()=>{
    console.log(`http://localhost:${port}`);
});

module.exports = app;