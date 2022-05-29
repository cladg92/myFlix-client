import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import axios from "axios";

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getUser = () => {
    axios
      .get(`https://myflixapi92.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-view">
      <p>{console.log({ user })}</p>
      <div className="title">
        <h1 className="value">My profile</h1>
      </div>
      <div className="profile-username">
        <span className="label">Username: </span>
        <span className="value">{user.Username}</span>
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

export default ProfileView;

ProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
