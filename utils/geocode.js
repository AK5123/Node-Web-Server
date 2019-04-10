const request = require("request");
var gecode=(address,callback) =>{
    url1="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?types=address&access_token=pk.eyJ1IjoiYWs1MTIzIiwiYSI6ImNqdTAyeWpocTB4N240ZG1oMWhwMmIxaTMifQ.KcDOk44rw6S4T5mG5hmU8g&limit=1";
    request({url: url1,json: true},(error,{body}={}) =>{
        if(error){
            callback("Uanble to fetch data",undefined);
        }
        else if(body.features.length===0){
            callback("No match found.Try again!!",undefined);
        }
        else{
            callback(undefined,{
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name}
            );
        }

    })
};

module.exports = gecode;