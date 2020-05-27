const request = require("request");

const geocode = (address,callback)=>{
  const mapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?limit=1&access_token=pk.eyJ1IjoiYW51amJoYXR0MDIzIiwiYSI6ImNrYW52ZnN4cTB6ZG8yeW12cWlrZXozcWQifQ.OpChkkN3w0Lbpxu9d6-pzQ"
  request({url:mapbox,json:true},(error,{body})=>{
    if(error){
      callback("not found!")
    }else if(body.features.length==0){
      callback("not found!")
    }else{
      callback(undefined,{
        longtitude:body.features[0].center[0],
        latitude:body.features[0].center[1],
        location:body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
