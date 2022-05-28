import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class GenreView extends Component {
  render() {
    const { onBackClick } = this.props;
    return (
      <div>
        <p>Genre view</p>
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
