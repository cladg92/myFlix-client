import React, { Component } from "react";
import { MovieCard } from "./favmovie-card";
import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import "./profile-view.scss";

export class FavoriteMovies extends Component {
  render() {
    const { favorites, deleteMovie, user, token } = this.props;

    return (
      <Card>
        <Card.Body>
          <Row className="justify-content-md-center">
            <Col xs={12}>
              <h5 className="label">My favorite movies</h5>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            {favorites.map((m) => {
              return (
                <Col key={m._id} xs={12} md={6} lg={4} className="fav-movie">
                  <MovieCard
                    favoriteMovies={favorites}
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

//Making states available as props in the component
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};
// dispatch action creators as props to child component
export default connect(mapStateToProps)(FavoriteMovies);

FavoriteMovies.propTypes = {
  favorites: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};
