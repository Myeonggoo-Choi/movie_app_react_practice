import React from 'react';
import axios from 'axios';
import Movies from './Movies';
import "./App.css"


class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  }

  getMovies = async () => {
    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    this.setState({ movies: movies, isLoading: false })
  }

  getYoutubeVideo = (movieName) => {
    require('dotenv').config()
    const apikey = process.env.REACT_APP_API_KEY;
    console.log(apikey)
    var videoId = ""
    var request = require('request')
    movieName = movieName.replace(/ /gi, '_')+"_trailer"
    const searchOptions = {
      q: movieName,
      part:"snippet",
      key: apikey,
      type:"video",
      maxResults:1,
      regionCode:"KR",
    };
    var url = "https://www.googleapis.com/youtube/v3/search?"
    for (var option in searchOptions){
      url+=option+"="+searchOptions[option]+"&"
    }
    url=url.substr(0, url.length-1);
    request(url, function(err, res, body){
      var videos = JSON.parse(body).items;
      for(var i in videos){
        videoId = videos[i].id.videoId
      }
    })
    console.log('exe')
    return "https://www.youtube.com/watch?v="+videoId
  }

  componentDidMount() {
    this.getMovies()
  }
  render() {
    const { isLoading, movies } = this.state
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
              {
                movies.map(movie => (
                  <Movies
                    key={movie.id}
                    trailer={this.getYoutubeVideo(movie.title)}
                    id={movie.id}
                    year={movie.year}
                    title={movie.title}
                    summary={movie.summary}
                    poster={movie.medium_cover_image}
                    genres={movie.genres}
                  />
              ))}
            </div>
          )}</section>
    )
  }
}

export default App;
