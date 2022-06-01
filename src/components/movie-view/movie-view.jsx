import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Col, Row, Card, Container } from "react-bootstrap";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <>
        <h1 className="movie-title">{movie.Title}</h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="movie-genre">
                  <span className="label">Genre: </span>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <span variant="link">{movie.Genre.Name}</span>
                  </Link>
                </div>
                <div className="movie-director">
                  <span className="label">Director: </span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <span variant="link">{movie.Director.Name}</span>
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h5 className="label">Description </h5>
                <p className="value">{movie.Description}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <img
              className="movie-poster"
              crossOrigin="anonymous"
              src={movie.ImagePath}
              height="700"
            />
          </Col>
        </Row>
        <Button
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

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
};
