var express = require('express');
var router = express.Router();
var got = require('got');
const ensureAuthenticatedAPI = require('../../config/ensureAuthenticatedAPI');

router.post("/", ensureAuthenticatedAPI,async(req,res)=>{

    var lat = req.body.lat;
    var lon = req.body.lon;
    var radius = req.body.radius; 
    var types = req.body["types[]"];
    var typesLength = req.body.typesLength;

    // Jank fix for array issue.
    if(typesLength <=1){
        var word = "";
        for(var i in types){
            word+=types[i];
        }
        types = [];
        types.push(word);
    }

    try{
        var mapParr = [];

        for(var i in types){
            var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},%20${lon}&radius=${getMeters(radius)}&type=${types[i]}&key=AIzaSyA5AtkBvlXeI567r7_tm3JlcYivAmfEmxs`;
            const response = await got(url);
            var obj = JSON.parse(response.body);
            var next_page_token = obj.next_page_token;

            for(i=0; i<obj.results.length; i++)
            {
                console.log(obj.results[i]);
                var temp_json = {
                    "business_status": obj.results[i].business_status,
                    "lat": obj.results[i].geometry.location.lat,
                    "lng": obj.results[i].geometry.location.lng,
                    "name": obj.results[i].name,
                    "types": obj.results[i].types,
                    "vicinity": obj.results[i].vicinity,
                    "user_rating": obj.results[i].rating
                };
                mapParr.push(temp_json);
            }
        }
        res.send({
            mapParr
        });

    }catch (error){
        console.log(error);
        res.status(500).send("An error occurred");
    }
});


module.exports = router;

// Converts miles to meters
function getMeters(miles){
    return miles*1609.34;
}