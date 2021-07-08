const axios=('axios');
module.exports=getMoviesHandler;
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
    }).catch(error=>{res.send(error,)})
}
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