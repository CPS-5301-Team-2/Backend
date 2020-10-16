const mongoose = require("mongoose");

var user = mongoose.Schema({

    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String}

});

module.exports = mongoose.model("Users", user);