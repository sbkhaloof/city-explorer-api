'use strict';
const axios=require('axios');
module.exports=getWeatherInfoHandler;
function getWeatherInfoHandler(req,res){
    
    let findQuery=req.query.cityName;
    // console.log(findQuery)
let weatherUrl=`https://api.weatherbit.io/v2.0/forecast/daily?city=${findQuery}&key=${process.env.WEATHER_API_KEY}`

axios
.get(weatherUrl)
.then(weatherData=>
    {
    let wData=weatherData.data.data.map(city=>{
        return new Forecast(city.valid_date,city.weather.description)
    })
    res.send(wData)
   
})

.catch(error=>{
    res.status(500).send(error,' : Something went wrong.')
})
}
class Forecast{
    constructor(date,description){
    this.date=date;
    this.description=description
}}