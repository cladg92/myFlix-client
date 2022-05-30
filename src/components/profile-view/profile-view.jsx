import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import axios from "axios";
import FavoriteMovies from "./favorite-movies";

export function ProfileView(props) {
  // for getUser
  const [user, setUser] = useState(props.user);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const history = useHistory();
  // for updateUser
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

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

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be at least 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Wrong format");
      isReq = false;
    }

    return isReq;
  };

  const updateUser = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for registration */
      axios
        .put(
          `https://myflixapi92.herokuapp.com/users/${currentUser}`,
          {
            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthDate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert("Profile was successfully updated, please login.");
          props.onBackLog();
        })
        .catch((e) => {
          console.log("Unable to update profile.");
        });
    }
  };

  const deleteUser = () => {
    axios.delete(`https://myflixapi92.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Profile was successfully deleted.");
    props.onBackLog();
  };

  return (
    <div className="profile-view">
      <div className="profile-info">
        <p>{console.log({ user })}</p>
        <div className="title">
          <h1 className="value">My profile</h1>
        </div>
        <div className="profile-username">
          <span className="label">Username: </span>
          <span className="value">{user.Username}</span>
        </div>
        <div className="profile-email">
          <span className="label">Email: </span>
          <span className="value">{user.Email}</span>
        </div>
        <div className="update-user">
          <h5>Update profile</h5>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* code added here to display validation error */}
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* code added here to display validation error */}
              {emailErr && <p>{emailErr}</p>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* code added here to display validation error */}
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </Form.Group>
            <Button
              className="mt-3"
              variant="success"
              type="submit"
              onClick={updateUser}
            >
              Update
            </Button>
            <Button
              className="mt-3"
              variant="success"
              type="submit"
              onClick={deleteUser}
            >
              Delete
            </Button>
          </Form>
          <div className="profile-favmovies">
            <h5 className="label">My favourite movies</h5>
            <Row className="justify-content-md-center">
              <FavoriteMovies
                user={currentUser}
                favoriteMovies={favoriteMovies}
              />
            </Row>
          </div>
        </div>
      </div>
      <Button
        variant="success"
        type="button"
        onClick={() => {
          history.goBack();
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
