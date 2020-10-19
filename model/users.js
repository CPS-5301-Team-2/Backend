const mongoose = require("mongoose");

var user = mongoose.Schema({

    name: {type: String, required: true, maxlength: 50},
    username: {type: String, required: true, maxlength: 10},
    password: {type: String, required: true},
    email: {type: String, required: true},
    position: {type: String, required: true},
    phone: {type: String}

});

module.exports = mongoose.model("Users", user);