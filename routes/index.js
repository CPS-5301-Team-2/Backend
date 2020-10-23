var express = require('express');
var router = express.Router();

router.get('/', (req, res) =>{
    res.render("index");
});

router.get('/login', (req,res)=>{
    res.render("login");
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