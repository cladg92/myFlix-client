import { React } from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

// extract visibility filter and movies into a prop
const mapStateToProps = (state) => {
  const { visibilityFilter, movies } = state;
  return { visibilityFilter, movies };
};

function MoviesList(props) {
  const { movies, visibilityFilter, favorites } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Row className="movie-row">
      <Col sm={12} className="mt-3 mb-3">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col xs={12} sm={6} md={4} lg={3} key={m._id} className="movie-col">
          <MovieCard movie={m} />
        </Col>
      ))}
    </Row>
  );
}

MoviesList.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, null)(MoviesList);
