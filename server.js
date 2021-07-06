'use strict';
const express =require('express');
const server=express();
require('dotenv').config();
const cors = require('cors');
server.use(cors());
// const weatherData=require('./data/weather.json')

const PORT=process.env.PORT;

// localhost:3008/
// server.get('/',(req,resp)=>{
//     resp.status(200).send('home route');       
// })

// // //localhost:3008/weather?cityName=amman
// server.get('/weather',(req,resp)=>{
//     console.log('inside func ')
//    console.log(req.query)
//     const cityWeather=weatherData.find(city=>{
//         if(req.query.cityName.toLowerCase()==city.city_name.toLowerCase()){
//             console.log(city)
//             return city;
             
//         }
        
            
//         })
//         const newCityWeather=cityWeather.data.map(day=>{
//             console.log(day)
//             return new Forecast(day.valid_date,day.weather.description)
//         })
//         console.log(newCityWeather)
//         resp.status(200).send(newCityWeather)
//     });
    
// server.get('*',(req,resp)=>{
//     resp.status(500).send('not found');
// })


// Route 
server.get('/test',testHandler)
server.get('/getWeatherInfo',getWeatherInfoHandler)
// function handler 
function testHandler(req,res){
    res.send('all good');
}
function getWeatherInfoHandler(req,res){
    let latQuery=req.lat.latstate
    let lonQuery=req.lon.lonstate
    
    //https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=0d9d593942904ac0acf6e484b7a96ba4&include=minutely
let weatherUrl=`https://api.weatherbit.io/v2.0/current?lat=${latQuery}&lon=${lonQuery}&ey=${process.env.WEATHER_API_KEY}`

axios
.get(weatherUrl)
.then(weatherData=>{
    weatherData.data.find(city=>{
        if(req.lat==city.data.lat)
        {return city}
    })
    res.send(weatherData.data)
   
})

.catch(error=>{
    res.status(500).send(error)
})
}

class Forecast{
    constructor(date,description){
    this.date=date;
    this.description=description
}}

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})