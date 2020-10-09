require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

app.get("/", (req,res)=>{

    res.send("Working");

});

app.listen(process.env.PORT, ()=>{console.log(`http://localhost:${port}`);});