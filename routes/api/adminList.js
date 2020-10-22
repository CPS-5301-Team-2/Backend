var express = require('express');
var router = express.Router();
var users = require('../../model/users');

router.get('/list', (req, res) =>{
    users.find((error, users)=>{
        if(error){
            res.send();
        }
        res.send(users);
    });
});

module.exports = router;