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
//localhost:3008/
server.get('/',homeTestHandler)
// localhost:3008/test
server.get('/test',testHandler)
 //localhost:3008/weather?cityName=amman
server.get('/getWeatherInfo',getWeatherInfoHandler)
// this for movies 
//localhost:3008/movies?cityName=amman
server.get('/movies',getMoviesHandler)



// function handler 
function homeTestHandler(req,res){
    res.send('welcome in home route');
}
function testHandler(req,res){
    
    res.send('all good');
}
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
    res.status(500).send(error)
})
}
console.log('befor movie function')
function getMoviesHandler(req,res){
    console.log('in weather fun')
    let findQuery=req.query.query;
     console.log(findQuery,'findquery')
    
    // https://api.themoviedb.org/3/search/movie?api_key=87020c9c5f33ddf9ff4333a9ea79b990&query=irbid
    let movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${findQuery}`;
    console.log(movieUrl);
    axios
    .get(movieUrl)
    .then(movieData=>{
         console.log(movieData.data.results)
        let movieInfo=movieData.data.results
         console.log(movieInfo)
        let moviesObj = movieInfo.map(movies => {
            
            return (new Movie(movies.title, movies.overview, movies.vote_average, movies.vote_count, movies.poster_path, movies.popularity, movies.release_date))
        })
        res.status(200).send(moviesObj)
    }).catch(error=>{res.send(error)})
}
 console.log('after movie fun')
class Forecast{
    constructor(date,description){
    this.date=date;
    this.description=description
}}

class Movie{
    constructor(title,overview,avarge_votes,total_votes,image_url,popularity,relased_on){
        this.title=title;
        this.overview=overview;
        this.avarge_votes=avarge_votes;
        this.total_votes=total_votes;
        this.image_url=`https://image.tmdb.org/t/p/w500/${image_url}`;
        this.popularity=popularity;
        this.relased_on=relased_on;
    }
}
server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})