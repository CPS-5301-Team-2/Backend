var express = require('express');
var router = express.Router();
var got = require('got');


router.post("/locations", async(req,res)=>{

    const {lat,lon,filter, radius, type} = req.body;
    
    try{
        const response = await got(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.678947,%20-74.232321&radius=500&type=restaurant&key=AIzaSyA5AtkBvlXeI567r7_tm3JlcYivAmfEmxs`);
        console.log(response.body);
    }catch (error){
        console.log(error.response.body);
    }
});


module.exports = router;