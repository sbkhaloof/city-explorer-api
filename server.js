'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData=require('./data/weather.json')

const server = express();
const PORT = process.env.PORT;

server.use(cors());





//localhost:3008/
 server.get('/',(req,resp)=>{
    resp.status(200).send('home route');       
 })

 // localhost:3008/test
 server.get('/test',(req,res)=>{
     res.status(200).send('my server is working')
 })
// localhost:3008/weather?cityName=amman
try{
server.get('/weather',(req,resp)=>{

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
    }catch{
        resp.status(404).send('Erorr 404 :you send some thing error');
    }

 server.get('*',(req,resp)=>{
     resp.status(500).send('not found');
 })






// .catch(error=>{
//     res.status(500).send(error,' : Something went wrong.')
// })
// }



class Forecast{
    constructor(date,description){
    this.date=date;
    this.description=description
}}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})