import { React } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//favorite images

import xMark from "../../img/x-mark.png";

import "./favmovie-card.scss";

export function MovieCard(props) {
  //const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { movie, deleteMovie } = props;

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
  deleteMovie: PropTypes.func.isRequired,
};
