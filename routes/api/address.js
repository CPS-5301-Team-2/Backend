var express = require('express');
var router = express.Router();
var got = require('got');
const ensureAuthenticatedAPI = require('../../config/ensureAuthenticatedAPI');
const GOOGLE_API_KEY = require('../../config/GOOGLE_API_KEY');

router.post("/", ensureAuthenticatedAPI,async(req,res)=>{

    var lat = req.body.lat;
    var lon = req.body.lon;
    var radius = req.body.radius; 
    var types = JSON.parse(req.body.types);

    try{
        var mapParr = [];
        for(var i in types){
            var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},%20${lon}&radius=${getMeters(radius)}&type=${types[i].type}&key=${GOOGLE_API_KEY}`;
            const response = await got(url);
            var obj = JSON.parse(response.body);
            var next_page_token = obj.next_page_token;

            for(j=0; j<obj.results.length; j++)
            {
                var temp_json = {
                    "business_status": obj.results[j].business_status,
                    "lat": obj.results[j].geometry.location.lat,
                    "lng": obj.results[j].geometry.location.lng,
                    "name": obj.results[j].name,
                    "types": types[i],
                    "vicinity": obj.results[j].vicinity,
                    "user_rating": obj.results[j].rating,
                    "category": types[i].category
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