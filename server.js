'use strict';
const express =require('express');
const server=express();
require('dotenv').config();
const cors = require('cors');
server.use(cors());
const weatherData=require('./data/weather.json')

const PORT=process.env.PORT;

// localhost:3003/
server.get('/',(req,resp)=>{
    resp.status(200).send('home route');       
})

// //localhost:3003/weatherInfo?cityName=charmander
server.get('/weather',(req,resp)=>{
    const cityWeather=weatherData.find(city=>{
        if(city.city_name==req.query.cityName){
            return city
        }
    });
    const newCityWeather=cityWeather.date.map(day=>{
        return new Forecast(day.Forecast.description,day.Forecast.valid_date)
    })
    resp.status(200).send(newCityWeather)
   
})
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