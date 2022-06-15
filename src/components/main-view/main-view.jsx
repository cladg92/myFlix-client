import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { setMovies, setUser, setFavorites } from "../../actions/actions.js";
import MoviesList from "../movies-list/movies-list";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import NavBar from "../navbar/navbar";
import { Container, Row, Col } from "react-bootstrap";
import { RegisterView } from "../register-view/register-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "./main-view.scss";

class MainView extends React.Component {
  /*constructor() {
    super();
    this.state = {
      user: null,
    };
  }*/

  // METHODS

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem("user"));
      this.getMovies(accessToken);
      this.getFavMovies();
    }
  }

  // Set Movies state in the store
  getMovies(token) {
    axios
      .get("https://myflixapi92.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the setMovies state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // set favorite movies in the store
  getFavMovies() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://myflixapi92.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setFavorites(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser(null);
    window.open("/", "_self");
  }

  render() {
    // movies is extracted from this.props rather than from the this.state
    let { movies, user } = this.props;

    return (
      <Router>
        <NavBar
          onBackLog={() => {
            this.onLoggedOut();
          }}
          user={user}
        />
        <Container>
          <Row className="justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col md={7}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0)
                  return <div className="main-view"></div>;
                return <MoviesList />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col md={7}>
                    <RegisterView />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${user}`}
              render={(history, match) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col>
                    <ProfileView
                      history={history}
                      match={match}
                      movies={movies}
                      user={user}
                      onBackLog={() => {
                        this.onLoggedOut();
                      }}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0)
                  return <div className="main-view"></div>;
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0)
                  return <div className="main-view"></div>;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      movies={movies.filter(
                        (m) => m.Director.Name === match.params.name
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // Before the movies have been loaded
                if (movies.length === 0)
                  return <div className="main-view"></div>;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      movies={movies.filter(
                        (m) => m.Genre.Name === match.params.name
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

// state from store and pass it as a prop to the component
let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user, favorites: state.favorites };
};

// connect() to connect component to store
export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setFavorites,
})(MainView);

MainView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  setMovies: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired,
};
