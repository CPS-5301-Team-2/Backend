const mongoose = require("mongoose");

var admin = mongoose.Schema({

    name: {type: String, required: true, maxlength: 50},
    username: {type: String, required: true, maxlength: 10},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String}

});

module.exports = mongoose.model("admin", admin);