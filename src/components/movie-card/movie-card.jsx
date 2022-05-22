import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
      const { movieData, onMovieClick } = this.props;

      return <div className="movie-card" onClick={() => {onMovieClick(movieData)}}>{movieData.Title}</div>;
    }
  }

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired}).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }).isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};