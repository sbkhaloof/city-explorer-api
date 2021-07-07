'use strict';
const express =require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const server=express();
const PORT=process.env.PORT;

server.use(cors());

// const weatherData=require('./data/weather.json')



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


//// Route 
// localhost:3008/test
server.get('/test',testHandler)
 //localhost:3008/weather?cityName=amman
server.get('/getWeatherInfo',getWeatherInfoHandler)
// function handler 
function testHandler(req,res){
    res.send('all good');
}
function getWeatherInfoHandler(req,res){
    let findQuery=req.query.cityName;
    console.log(findQuery)
let weatherUrl=`https://api.weatherbit.io/v2.0/forecast/daily?city=${findQuery}&key=${process.env.WEATHER_API_KEY}`

axios
.get(weatherUrl)
.then(weatherData=>{
    let wData=weatherData.data.data.map(city=>{
        return new Forecast(city.valid_date,city.weather.description)
    })
    res.send( wData)
   
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