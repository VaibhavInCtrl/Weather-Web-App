const express = require("express");
const app  = express();
const https = require("https");

app.listen(3000,function(){
    console.log("server started at port 3000 ")
})
app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
    const query = req.body.cityname;
    console.log(req.body);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID=23c00ee58d4ffc76df58371cf00ba24a&units=metric";
    https.get(url,function(response){
        response.on("data",function(data){
            const wd = JSON.parse(data);
            const temp = wd.main.temp;
            const wl = wd.weather[0].description;
            const icon = wd.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature today is " + temp+"</h1>");
            res.write("<p>The weather in "+query+" is "+ wl + "</p>");
            res.write("<img src ="+imageURL+" >");
            res.send()
        })
    })

})
