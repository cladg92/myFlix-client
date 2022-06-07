import { React, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//favorite images

import xMark from "../../img/x-mark.png";

import "./favmovie-card.scss";

export function MovieCard(props) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { movie } = props;

  // set favorite movies
  const getFavMovies = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://myflixapi92.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getFavMovies();
  }, []);

  // METHODS

  //calling API to remove movie from the users list
  const deleteMovie = (id) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(`https://myflixapi92.herokuapp.com/users/${user}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Card>
      <Link to={`/movies/${movie._id}`}>
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
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
          onClick={() => {
            deleteMovie(movie._id);
          }}
        >
          <img src={xMark} className="x-icon" />
        </a>
      </Card.Body>
    </Card>
  );
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
