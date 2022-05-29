import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class DirectorView extends Component {
  render() {
    const { onBackClick, director } = this.props;
    return (
      <div className="director-view">
        <div className="director-name">
          <h1 className="value">{director.Name}</h1>
        </div>
        <div className="director-birth">
          <p className="value">{`${director.Birth} - ${director.Death}`}</p>
        </div>
        <div className="director-bio">
          <h4 className="label">Biography</h4>
          <p className="value">{director.Bio}</p>
        </div>
        <Button
          className="mt-3"
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
