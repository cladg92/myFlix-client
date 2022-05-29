import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

class ProfileView extends Component {
  // METHODS

  render() {
    const { onBackClick, user, users } = this.props;
    return (
      <div className="profile-view">
        <p>{console.log({ user })}</p>
        <div className="title">
          <h1 className="value">My profile</h1>
        </div>
        <div className="profile-username">
          <span className="label">Username: </span>
          <span className="value"></span>
        </div>
        <div className="profile-favmovies">
          <h5 className="label">My favourite movies</h5>
          <span className="value">{}</span>
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

export default ProfileView;

ProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
