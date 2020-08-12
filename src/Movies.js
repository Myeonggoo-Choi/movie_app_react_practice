import React from 'react';
import PropTypes from "prop-types";
import "./Movie.css"

class Movies extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isToggle: true,
            summary: this.props.summary.slice(0, 150) + "..."
        }
    }

    toggleBtn = () => {
        this.setState(
            (prevState) => {
                return {
                    isToggle : !prevState.isToggle,
                    summary: prevState.isToggle ? this.props.summary : this.props.summary.slice(0, 150) + "..."
                }
            })
    }

    render(){
        const {poster, title, year, genres, trailer} = this.props
        return (
            <div className="movie">
                <img src={poster} alt={title} title={title}></img>
                <div className="movie_data">
                    <h3 className="movie_title"><a href={trailer}>{title}</a></h3>
                    <h5 className="movie_year">{year}</h5>
                    <p className="movie_summary">
                        {this.state.summary}
                        <button
                            className="extend_btn" 
                            onClick={this.toggleBtn}
                        >{this.state.isToggle? "show more" : "show less"}</button>
                    </p>
                    <ul className="genres">
                        {genres.map((genre, index) => (
                            <li className="genres_genre" key={index}>{genre}</li>
                        ))}
                    </ul>
                </div>
            </div >
        )
    }
}

Movies.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movies;