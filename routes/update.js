var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/users");
const SALT_PASSES = parseInt(process.env.SALT_PASSES) || 8;

// admin update userinfo 
// does session has unique id? 
router.post('/userupdate/:id', (req, res)=>{
    const {name, username, phone, email, role} = req.body;
    console.log(req.body);
    User.update({username: req.params.id}, {$set:{
    name: name,    
    username: username,
    phone: phone,
    email: email,
    rank: role
    }}, function(err){
        if(err){
            console.log(err);
        }else{return res.json({ message: "success to update"});}
    })
});

router.post('/passwordupdate/:id', async (req, res)=>{
    const {password} = req.body;
    //hash password
    const passwordHash = await bcrypt.hash(password, SALT_PASSES);

    User.update({username: req.params.id}, {$set:{
        password: passwordHash
        }}, function(err){
            if(err){
                console.log(err);
            }else{return res.json({ message: "success to update"});}
        })
})

module.exports = router;