import React, { Component } from "react";
import axios from "axios";
import { MovieCard } from "./favmovie-card";
import { Col } from "react-bootstrap";

class FavoriteMovies extends Component {
  // METHODS

  deleteMovie(m) {
    axios.delete(
      `https://myflixapi92.herokuapp.com/users/${this.props.user}/movies/${m}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("Movie was successfully deleted.");
    window.open(`/users/${this.props.user}`, "_self");
  }

  render() {
    const { favoriteMovies } = this.props;
    return favoriteMovies.map((m) => (
      <Col key={m._id} md={3}>
        <MovieCard movie={m} />
      </Col>
    ));
  }
}

export default FavoriteMovies;
