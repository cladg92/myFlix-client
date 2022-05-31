import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row, Card } from "react-bootstrap";

class DirectorView extends Component {
  render() {
    const { onBackClick, director, movies } = this.props;
    return (
      <>
        <h1 className="director-name">{director.Name}</h1>
        <p className="director-birth">{`${director.Birth} - ${director.Death}`}</p>
        <Card>
          <Card.Body>
            <h5 className="label">Biography</h5>
            <p className="value">{director.Bio}</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <h5 className="label">Movies</h5>
            <Row className="justify-content-md-center">
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
}

export default DirectorView;

DirectorView.propTypes = {
  director: PropTypes.shape({
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
