var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/users");
const SALT_PASSES = process.env.SALT_PASSES || 8;
const passport = require("passport");
const app = require('../app');

router.post("/login", 
    passport.authenticate('local',{
        failureRedirect: "/",
        failureFlash: true
    }), (req,res)=>{

    // TODO actions after user gets authenticated

        // option1: if rank is user, redirect ("/user") <== this will be for regular user
        //             else redirect to ("/admin") <== this will be admin get (admin only)
});

/*example for isLoggedIn for middleware */
// async(req,res,next)=>{
//     console.log(req.cookies);
//     if(req.cookies.jwt){
//         try {
//             //1) verify the token
//             const decoded = await promisify(jwt.verify)(req.cookies.jwt,
//                 process.env.JWT_SECRET
//                 );
                
//                 //2)check if user is still available
//             config.imcdb.query('SELECT * FROM node_login where UserID = ?', [decoded.id], (error, result) => {
//                 console.log(result);

//                 if(!result){
//                     return next();
//                 }

//                 req.user = result[0];
//                 return next();
//             });
//                 console.log(decoded);
                
//         } catch (error) {
//             console.log(error);
//             return next();
//         }
//     }else{
//         next()
//     }
// }

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
    }
});

// Logs user out.
router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect("/");
});

module.exports = router;