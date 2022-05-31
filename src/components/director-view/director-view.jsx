import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row } from "react-bootstrap";

class DirectorView extends Component {
  render() {
    const { onBackClick, director, movies } = this.props;
    return (
      <div className="director-view">
        <p>{console.log("hello")}</p>
        <div className="director-name">
          <h1 className="value">{director.Name}</h1>
        </div>
        <div className="director-birth">
          <p className="value">{`${director.Birth} - ${director.Death}`}</p>
        </div>
        <div className="director-bio">
          <h5 className="label">Biography</h5>
          <p className="value">{director.Bio}</p>
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

export default DirectorView;

DirectorView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
