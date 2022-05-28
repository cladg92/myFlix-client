import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class DirectorView extends Component {
  render() {
    const { onBackClick } = this.props;
    return (
      <div>
        <p>Director view</p>
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

export default DirectorView;

DirectorView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
