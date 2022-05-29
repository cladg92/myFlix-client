import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class GenreView extends Component {
  render() {
    const { onBackClick, genre } = this.props;
    return (
      <div className="genre-view">
        <div className="genre-name">
          <h1 className="value">{genre.Name}</h1>
        </div>
        <div className="genre-description">
          <h5 className="label">Description</h5>
          <p className="value">{genre.Description}</p>
        </div>
        <Button
          variant="success"
          type="button"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

export default GenreView;

GenreView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
