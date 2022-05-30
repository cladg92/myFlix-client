import React, { Component } from "react";
import axios from "axios";
import { MovieCard } from "./favmovie-card";
import { Col } from "react-bootstrap";

class FavoriteMovies extends Component {
  render() {
    const { favoriteMovies, user, token } = this.props;
    return favoriteMovies.map((m) => (
      <Col key={m._id} md={3}>
        <MovieCard token={token} user={user} movie={m} />
      </Col>
    ));
  }
}

export default FavoriteMovies;
