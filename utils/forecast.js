(function(){const request = require("request");
var forecast=(lat,long,callback) =>{
    url= "https://api.darksky.net/forecast/7fd0ad42bbced15ab3cc43e06fb8f195/"+lat+","+long;
    request({url: url,json: true},(error,response) =>{
        if(error){
            callback("Unable to request service!!",undefined);
        }
        else if(response.body.error){
            callback("Location not found");
        }
        else{
            callback(undefined,{
                Timezone: response.body.timezone,
                Probability: response.body.currently.precipProbability,
                Location: response.body.timezone,
                Windspeed: response.body.currently.windSpeed,
                message: response.body.hourly.summary
            });
        }
    })
};
module.exports = forecast;
})();