var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/users");

router.post("/login", (req,res)=>{

    // TODO make login post to authenticate user

});

router.post("/create", async (req,res)=>
{

    //create from admin 
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
    if(errors)
    {
        const firstError = errors.map(error =>error.msg)[0];
        console.group(firstError);
        return res.json({error: firstError});
    }

    const{name, username, password, email, phone} = req.body;

    try
    {
        //check if username is already taken
        let user = await User.findOne({username});
        if(user)
        {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        //hash password
        const passwordhash = await bcrypt.hash(password, 8);
        console.log(passwordhash);

        user = new User({
            name,
            username,
            password: passwordhash,
            email,
            phone, 
            rank: "User"
        });

        await user.save(function(err){
            if(err){
                console.log(err);
            }else{
                res.json({
                    message: "success"
                });
            }
        });
    } catch (err){
        console.log(err.message);
    }
});

module.exports = router;