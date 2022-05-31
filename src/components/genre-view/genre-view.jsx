import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row } from "react-bootstrap";

class GenreView extends Component {
  render() {
    const { onBackClick, genre, movies } = this.props;
    return (
      <div className="genre-view">
        <p>{console.log({ genre })}</p>
        <div className="genre-name">
          <h1 className="value">{genre.Name}</h1>
        </div>
        <div className="genre-description">
          <h5 className="label">Description</h5>
          <p className="value">{genre.Description}</p>
        </div>
        <div className="director-movies">
          <h5 className="label">Movies</h5>
          <Row>
            {movies.map((m) => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))}
          </Row>
        </div>
        <Button
          className="mt-3"
          variant="success"
          type="button"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

export default GenreView;

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
