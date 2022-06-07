import { React, useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row, Card } from "react-bootstrap";

function GenreView(props) {
  const { onBackClick, genre, movies } = props;

  return (
    <>
      <h1 className="genre-name">{genre.Name}</h1>
      <Card>
        <Card.Body>
          <h5 className="label">Description</h5>
          <p className="value">{genre.Description}</p>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h5 className="director-movies">Movies</h5>
          <Row>
            {movies.map((m) => (
              <Col xs={12} md={6} lg={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
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
    </>
  );
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
