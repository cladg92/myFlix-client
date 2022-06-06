import { React, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

// extract visibility filter into a prop
const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  // set favorite movies
  const getFavMovies = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://myflixapi92.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getFavMovies();
  }, []);

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: "1em" }}>
        <p>{console.log(favoriteMovies)}</p>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={3} key={m._id}>
          <MovieCard favoriteMovies={favoriteMovies} movie={m} />
        </Col>
      ))}
    </>
  );
}

export default connect(mapStateToProps, null)(MoviesList);
