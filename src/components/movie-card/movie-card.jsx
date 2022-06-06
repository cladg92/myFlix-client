import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  // METHODS

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
      })
      .catch((error) => console.error(error));
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
          <Link to={`/movies/${movie._id}`}>
            <Card.Title>{movie.Title}</Card.Title>
          </Link>
          <Button
            onClick={() => {
              this.addMovie(movie._id);
            }}
            variant="warning"
          >
            Add to favorites
          </Button>
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
