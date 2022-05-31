import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  // METHODS

  deleteMovie(id) {
    axios
      .delete(
        `https://myflixapi92.herokuapp.com/users/${this.props.user}/movies/${id}`,
        {
          headers: { Authorization: `Bearer ${this.props.token}` },
        }
      )
      .then(() => {
        alert(`The movie was successfully deleted.`);
        window.open(`/users/${this.props.user}`, "_self");
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <p>{console.log("Hello")}</p>
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="success">Open</Button>
          </Link>
          <Button
            onClick={() => {
              this.deleteMovie(movie._id);
            }}
            variant="warning"
          >
            Remove
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
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
};
