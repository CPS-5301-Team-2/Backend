var express = require('express');
var router = express.Router();
var ensuredAuthenticated = require("../config/ensureAuthenticated");
const ensureAdminAuthenticated = require("../config/ensureAdminAuthenticated");
var users = require("../model/users");

router.get('/', (req, res) =>{
    res.redirect("homepage");
});

router.get('/login', (req,res)=>{
    var flash = req.flash('error')[0];
    res.render("login", {message: flash});
});

// check my work bahad
router.get('/homepage', ensuredAuthenticated, (req,res)=>{
    res.render("homepage", {
        rank: req.rank,
        name: req.user.name
    });
});

router.get('/profile', (req,res)=>{
    res.render("profile");
});

router.get('/contact', ensuredAuthenticated, async (req,res)=>{

    var user = await users.find({}).select({"name": 1, "rank": 1, "phone": 1, "email": 1, "_id": 0}).lean();
    res.render("contact", {user: user});
});

router.get('/admin', ensureAdminAuthenticated, (req,res)=>{
    res.render("admin");
});

router.get('/nav', (req,res)=>{
    res.render('navbar');
});

//admin example for middleware 
// router.get('/staff', authController.isLoggedIn, function (req, res) {
//     if (req.user.Position == "staff") {
//         res.render('../views/staff');
//     }
//     else {
//         res.redirect('/login');
//     }
// });

// router.get('/profile', authController.isLoggedIn, function (req, res) {
//     if(req.user.Position == "student"){
//         res.render('../views/profile', {
//             user: req.user
//         });
       
//     }
//     else{
//         res.redirect('/login');
//     }
// });

module.exports = router;