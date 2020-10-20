const mongoose = require("mongoose");
require('dotenv').config({path: ''});

var mongoDB = process.env.MONGO_URI;
var db = mongoose.connect(mongoDB,(err, res)=>{
    if(err){
        console.log('ERROR connecting to:' + mongoDB+'. '+ err);
    }else{
        console.log('Successed connected to mongoDB');
    }
});

module.exports = {
    db:db
};

