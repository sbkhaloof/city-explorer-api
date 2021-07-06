'use strict';
const express =require('express');
const server=express();
require('dotenv').config();
const cors = require('cors');
server.use(cors());
const weatherData=require('./data/weather.json')

const PORT=process.env.PORT;

// localhost:3008/
server.get('/',(req,resp)=>{
    resp.status(200).send('home route');       
})

// //localhost:3008/weather?cityName=amman
server.get('/weather',(req,resp)=>{
    console.log('inside func ')
   console.log(req.query)
    const cityWeather=weatherData.find(city=>{
        if(req.query.cityName.toLowerCase()==city.city_name.toLowerCase()){
            console.log(city)
            return city;
             
        }
        
            
        })
        const newCityWeather=cityWeather.data.map(day=>{
            console.log(day)
            return new Forecast(day.valid_date,day.weather.description)
        })
        console.log(newCityWeather)
        resp.status(200).send(newCityWeather)
    });
    
    
   
 
server.get('*',(req,resp)=>{
    resp.status(500).send('not found');
})

class Forecast{
    constructor(date,description){
    this.date=date;
    this.description=description
}}
server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})