var express = require('express');
var router = express.Router();
const users = require("../model/users");
const mongoose = require("mongoose");

router.get('/', (req, res) =>{
    return users.find((err, result)=>{
        if(err){
            return res.json({
                error: "internal issue"
            })
        }else{
            console.log(result);
            res.render({
                admins: result
            });
        }
    })
});

module.exports = router;