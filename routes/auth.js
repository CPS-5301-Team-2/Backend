var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/users");
const SALT_PASSES = parseInt(process.env.SALT_PASSES) || 8;
const passport = require("passport");
const app = require('../app');
const ensureAdminAuthenticated = require("../config/ensureAdminAuthenticated");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');


router.post("/login", 
    passport.authenticate('local',{
        failureRedirect: "/login"
    }), (req,res)=>{
        
        res.redirect('/homepage');
});

router.post("/create", ensureAdminAuthenticated, async (req,res)=>
{

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
        const passwordHash = await bcrypt.hash(password, SALT_PASSES);
        console.log(passwordHash);

        user = new User({
            name,
            username,
            password: passwordHash,
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
        res.status(500);
        res.send("Internal Error");
    }
});

// Logs user out.
router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect("/");
});

module.exports = router;