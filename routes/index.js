var express = require('express');
var router = express.Router();
var ensuredAuthenticated = require("../config/ensureAuthenticated");
const ensureAdminAuthenticated = require("../config/ensureAdminAuthenticated");

router.get('/', (req, res) =>{
    res.render("index");
});

router.get('/login', (req,res)=>{
    res.render("login");
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

router.get('/contact', (req,res)=>{
    res.render("contact");
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