const mongoose = require("mongoose");
require('dotenv').config({path: ''});

var mongoDB = process.env.MONGO_URI;
const InitiateMongoServer = async () => {
    try{
        await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        console.log("Connected to MongoDB");
    }catch (e){
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;