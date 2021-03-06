import React, { Component } from "react";
import { MovieCard } from "./favmovie-card";
import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import "./profile-view.scss";

class FavoriteMovies extends Component {
  render() {
    const { favoriteMovies, deleteMovie, user, token } = this.props;

    return (
      <Card>
        <Card.Body>
          <Row className="justify-content-md-center">
            <Col xs={12}>
              <h5 className="label">My favorite movies</h5>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            {favoriteMovies.map((m) => {
              return (
                <Col key={m._id} xs={12} md={6} lg={4} className="fav-movie">
                  <MovieCard
                    favoriteMovies={favoriteMovies}
                    deleteMovie={deleteMovie}
                    token={token}
                    user={user}
                    movie={m}
                  />
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default FavoriteMovies;

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};
