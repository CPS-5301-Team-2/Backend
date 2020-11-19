var express = require('express');
var router = express.Router();
var got = require('got');


router.post("/locations", async (req,res)=>{

    const {location,filter, radius} = req.body;

});
