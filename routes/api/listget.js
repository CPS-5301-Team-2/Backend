var express = require('express');
var router = express.Router();
var users = require('../../model/users');
var admins = require('../../model/admin');

router.get('/user', (req, res) =>{
    users.find((error, users)=>{
        if(error){
            console.log(error);
        }
        res.send(users);
    })
});
router.get('/admin', (req, res) =>{
    admins.find((error, admin) =>{
        if(error){
            console.log(error);
        }
        res.send(admin);
    })
});

module.exports = router;