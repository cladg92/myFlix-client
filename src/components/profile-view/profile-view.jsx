import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class ProfileView extends Component {
  render() {
    const { onBackClick } = this.props;
    return (
      <div>
        <p>Profile view</p>
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

export default ProfileView;

ProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
