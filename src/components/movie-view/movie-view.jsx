import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
    render() {
        const {movie, onBackClick} = this.props;

        return (
        <div className='movie-view'>
            <div className='movie-poster'>
                <img crossorigin="anonymous" src={movie.ImagePath} height="300"/>
            </div>
            <div className='movie-title'>
                <span className='label'>Title: </span>
                <span className='value'>{movie.Title}</span>
            </div>
            <div className='movie-year'>
                <span className='label'>Release year: </span>
                <span className='value'>{movie.ReleaseYear}</span>
            </div>
            <div className='movie-description'>
                <span className='label'>Description: </span>
                <span className='value'>{movie.Description}</span>
            </div>
            <div className='movie-genre'>
                <span className='label'>Genre: </span>
                <span className='value'>{movie.Genre.Name}</span>
            </div>
            <div className='movie-director'>
                <span className='label'>Director: </span>
                <span className='value'>{movie.Director.Name}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}>Back</button>

        </div>
        )
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
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
    onBackClick: PropTypes.func.isRequired
  };