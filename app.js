const express = require ("express");

const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); 
app.get("/",function(req,res){ 

    res.sendFile(__dirname + "/index.html");
   
    

});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    
     const query = req.body.cityName;
     const apikey = "a1a50b33738c8ba183aa407ef544456c"
     const unit = "metric"
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apikey +"&units="+ unit+"";

     https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherdescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            res.write("<p>The weather is currently "+ weatherdescription + "</p>");
            res.write("<h1>The temperature in "+ query+" is "+ temperature +"degree celcius<h1>");
            res.write("<img src = "+ imageURL +">")
            res.send(); 
            
        });

        }); 
   
});




app.listen(3000,function(){

        console.log("Server is running on port 3000");
});