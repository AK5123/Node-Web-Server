const path=require("path");

//to include partials
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const express=require("express");
const server=express();

var pathname = path.join(__dirname,"/public");
var viewname = path.join(__dirname,"/templates/views");
var partial = path.join(__dirname,"/templates/partials");


server.use(express.static(pathname));

// handlebars set up with express
server.set("view engine", "hbs");

// To change default directory
server.set("views",viewname);

//to set up partials
hbs.registerPartials(partial);

server.get("/", (req, res) => {
          res.render("index",{title : "Weather"});
})
server.get("/about", (req, res) => {
    res.render("about",{title : "AK47"});
})
server.get("/help", (req, res) => {
    res.render("help",{title : "Help me !!!"});
})

server.get("/weather",(req,res) =>{
    if(!req.query.search){
        res.send("Error");
    }
    else{
        geocode(req.query.search,(error,{lat,long,location}={}) =>{
            if(error){
                res.send({
                    error: error
                });
            }
            else{
                forecast(lat,long,(error,response) =>{
                    if(error){
                        res.send({
                            error: error
                        })
                    }
                    else{
                        res.send({
                            content: "Location is "+response.Location+".\n Probability of rainfall " + response.Probability + "%.\n Windspeed" + response.Windspeed 
                        })                    
                    }
 
                })
            }
        }) 
       


    }
})

server.get("*", (req, res) => {
    res.render("error",{title : "Help me !!!"});
})

server.listen(5500,() =>{
    console.log("started");
});