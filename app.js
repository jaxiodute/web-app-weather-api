const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const ejs=require("ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
const https=require("https");
var weather="";
var c_name="";
app.get("/",function(req,res)
{


    res.render("home",{
        weather:weather,
        c_name:c_name,
    });

});
app.post("/getweather",function(req,res){
    var lat=req.body.lat;
    var lon=req.body.lon;
    https.get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=ee949cc184264765ad2f53c854eb1a81",function(response){
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            weather=weatherdata.weather[0].description;
            console.log(weather);
            c_name=weatherdata.name;
            console.log(c_name);
        });
    });
    console.log(lat+lon);
res.redirect("/");
});
app.listen(process.env.PORT || 3000,function (req,res) {
    console.log("server running on port 3000");

});
