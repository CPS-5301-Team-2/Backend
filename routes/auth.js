var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/users");

router.post("/login", (req,res)=>{

    // TODO make login post to authenticate user

});

router.post("/create", (req,res)=>{

    //create from admin 

    //Eunbi --will update 
    req.check('name', "Name is required").notEmpty();
    req.check('username', "Username is required").notEmpty();
    req.check('password', "password is required").notEmpty();
    req.check('password')
        .isLength({min: 6})
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain at least 1 numeric character")
        .matches(/[!@#\$%\^&\*]/)
        .withMessage("Password must contain at least one special character")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least 1 uppercase alphabetical character")
    req.check('email', "Email is required").notEmpty();
    req.check('phone', "Phone number is required").notEmpty();

    //check for input validation causes
    const errors = req.validationErrors();
    //if error, show the first error
    if(errors){
        const firstError = errors.map(error =>error.msg)[0];
        console.group(firstError);
        return res.json({error: firstError});
    }

    const{name, username, password, email, phone} = req.body;

});

module.exports = router;