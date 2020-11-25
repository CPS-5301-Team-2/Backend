
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let inputLocation = "";
let inputRadius = "";
let types = [];

function initAutocomplete() {
    
    // Removes all default markers
    var myStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        }
    ];

     map = new google.maps.Map(document.getElementById("map"), {
    //   center: { lat: 40.6788, lng: -74.2324 },
        zoom: 16,
        mapTypeId: "roadmap",
        streetViewControl: false,  
        mapTypeControl: false,
        styles: myStyles
    });

    var infoWindow = new google.maps.InfoWindow({map: map});
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
    }
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); binds search to inside of map
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        console.log(places);

        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
            new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
            })
        );

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
        });
        map.fitBounds(bounds);
    });
}

function inputType(type){
    var elem = document.getElementById(type);
    console.log(elem.checked);
    if(types.includes(type)){
        if(!elem.checked){
            types.pop(type);
        }
    }else{
        types.push(type);
    }
    console.log(types);
}

function clearTypes(){
    var typeLength = types.length;
    for(var i=0; i<typeLength; i++){
        document.getElementById(`${types[i]}`).checked = false;
    }
    types = [];
}

var count = 0;

function addRadius(miles)
{
    var dis = miles;
    var gc = map.getCenter();
    inputRadius = miles;

    if(count == 0)
    {
        if(dis > 0)
        {
            
            cityCircle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.1,
            map,
            center: gc,
            radius: (dis*16.11) * 100
            });
            count++;
        }
    }
    else
    {
        cityCircle.setCenter(gc)
        cityCircle.setRadius(parseFloat(  ((dis*16.11) * 100)) )
    }
}