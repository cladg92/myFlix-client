import React, { Component } from "react";
import { MovieCard } from "./favmovie-card";
import { Col, Row } from "react-bootstrap";

class FavoriteMovies extends Component {
  render() {
    const { favoriteMovies, user, token } = this.props;

    return (
      <>
        <Row className="justify-content-md-center">
          <Col xs={12}>
            <h5 className="label">My favourite movies</h5>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          {favoriteMovies.map((m) => {
            return (
              <Col key={m._id} xs={12} md={6} lg={3}>
                <MovieCard token={token} user={user} movie={m} />
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default FavoriteMovies;
