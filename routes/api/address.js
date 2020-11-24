var express = require('express');
var router = express.Router();
var got = require('got');


router.post("/locations", async(req,res)=>{

    const {lat,lon,filter, radius, type} = req.body;
    
    try{
        const response = await got(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.678947,%20-74.232321&radius=500&type=restaurant&key=AIzaSyA5AtkBvlXeI567r7_tm3JlcYivAmfEmxs`);
        var obj = JSON.parse(response.body);

        var maparr = [];
        for(i=0; i<obj.results.length; i++)
        {
            var temp_json = {
                "business_status": obj.results[i].business_status,
                "lat": obj.results[i].geometry.location.lat,
                "lng": obj.results[i].geometry.location.lng,
                "icon": obj.results[i].icon,
                "name": obj.results[i].name,
                "types": obj.results[i].types,
                "vicinity": obj.results[i].vicinity
            };
            maparr.push(temp_json);
        }

        res.render("homepage", {
            mapinfo = maparr
        });

    }catch (error){
        console.log(error.response.body);
    }
});


module.exports = router;