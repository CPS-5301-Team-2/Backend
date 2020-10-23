var express = require('express');
var router = express.Router();
var users = require('../../model/users');

router.get('/user', (req, res) =>{
    users.find({rank: "User"},(error, users)=>{
        if(error){
            console.log(error);
        }
        res.send(users);
    })
});
router.get('/admin', (req, res) =>{
    user.find((error, admin) =>{
        if(error){
            console.log(error);
        }
        res.send(admin);
    })
});

module.exports = router;