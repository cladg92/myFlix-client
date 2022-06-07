import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//favorite images
import heartEmpty from "../../img/heart_empty.png";
import heartFull from "../../img/heart_full.png";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  // METHODS

  //calling the API to add a favorite Movie to the user
  addMovie(id) {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://myflixapi92.herokuapp.com/users/${user}/movies/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert(`The movie was successfully added to favorites.`);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  }

  //calling API to remove movie from the users list
  deleteMovie(id) {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(`https://myflixapi92.herokuapp.com/users/${user}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`The movie was successfully deleted.`);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  }

  //when clicked the movie is either added/removed from the user via the API
  favMovieClick(e) {
    e.preventDefault();
    let { favoriteMovies } = this.props;
    let favMoviesIds = favoriteMovies.map((m) => m._id);
    let movieId = this.props.movie._id;
    if (favMoviesIds.includes(movieId)) {
      this.deleteMovie(movieId);
    } else {
      this.addMovie(movieId);
    }
  }

  //icon handler
  iconHandle() {
    let { favoriteMovies } = this.props;
    let favMoviesIds = favoriteMovies.map((m) => m._id);
    let movieId = this.props.movie._id;
    if (favMoviesIds.includes(movieId)) {
      return heartFull;
    } else {
      return heartEmpty;
    }
  }

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Link to={`/movies/${movie._id}`}>
          <Card.Img
            crossOrigin="anonymous"
            variant="top"
            src={movie.ImagePath}
          />
        </Link>
        <Card.Body>
          <Link
            to={`/movies/${movie._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Card.Title className="card-title">{movie.Title}</Card.Title>
          </Link>
          <a
            href="#"
            onClick={(e) => {
              this.favMovieClick(e);
            }}
          >
            <img src={this.iconHandle()} className="fav-icon" />
          </a>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }).isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
