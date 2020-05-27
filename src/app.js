const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")
const path= require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000 ;

const publicDirPath = path.join(__dirname,"../public");
const viewsPath= path.join(__dirname,"../views");
const partialsPath= path.join(__dirname,"../views/partials");
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirPath));

const title=process.argv[2];
const para=process.argv[3];

app.get("",(req,res)=>{
  res.render(viewsPath+'/index',{
    page:"weather"
  });
})

app.get("/help",(req,res)=>{
  res.render(viewsPath+"/help",{
    page:"help"
  });
})

app.get("/about",(req,res)=>{
  res.render(viewsPath+"/about",{
    page:"about"
  });
})

app.get("/weather",(req,res)=>{
  if(!req.query.location){
    return res.send({
      error:"please enter valid location"
    })
  }
  geocode(req.query.location,(error,geodata)=>{
    if(error){
      return res.send({
        error:"please enter valid location"
      })
    }
    forecast(geodata.location,(error,forecastData)=>{
      if(error){
        return res.send({
          error:"please enter valid location"
        })
      }
      return res.send({
        latitude:geodata.latitude,
        longtitude:geodata.longtitude,
        location:geodata.location,
        temperature:forecastData.temp,
        description:forecastData.des
      })
    })
  })
})

app.get('*',(req,res)=>{
  res.render(viewsPath+"/error");
})

app.listen(port,()=>{
  console.log("up ans running on port "+port);
});
