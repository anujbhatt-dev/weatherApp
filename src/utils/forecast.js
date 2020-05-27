const request = require("request");

const forecast = (city, callback)=>{
  const weatherstack = "http://api.weatherstack.com/current?access_key=aed1c8804719c385556dcc0f7628b885&query="+city;
   request({url:weatherstack,json:true},(error,{body})=>{
     // console.log("error---->"+error);
     // console.log("body--->"+body);
     if(error){
       callback("weatherstack error");
     }else if(body.error){
       callback("weatherstack error");
     }
       callback(undefined,{
         temp:body.current.temperature,
         des:body.current.weather_descriptions[0]
       })
   })
}

module.exports = forecast;
