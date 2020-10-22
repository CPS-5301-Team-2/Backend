const mongoose = require("mongoose");

var user = mongoose.Schema({

    name: {type: String, required: true, maxlength: 50},
    username: {type: String, required: true, maxlength: 10, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String}

});

module.exports = mongoose.model("Users", user);