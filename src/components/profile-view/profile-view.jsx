import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FavoriteMovies from "./favorite-movies";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";

import { connect } from "react-redux";
import { setFavorites } from "../../actions/actions.js";

export function ProfileView(props) {
  // for getUser
  //Declaring states as props from redux store through connect()
  const { favorites, setFavorites } = props;

  const [user, setUser] = useState("");
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

  // set user
  const getUser = () => {
    axios
      .get(`https://myflixapi92.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  //calling API to remove movie from the users list
  const deleteMovie = (id) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(`https://myflixapi92.herokuapp.com/users/${user}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        //refresh state
        setFavorites(favorites.filter((movie) => movie._id != id));
        console.log(favorites);
      })
      .catch((error) => console.error(error));
  };

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
          console.log(e + "Unable to update profile.");
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
    <Container className="profile-view">
      <h1 className="value">Profile</h1>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo username={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser
                username={username}
                usernameErr={usernameErr}
                setUsername={setUsername}
                password={password}
                passwordErr={passwordErr}
                setPassword={setPassword}
                email={email}
                emailErr={emailErr}
                setEmail={setEmail}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                updateUser={updateUser}
                deleteUser={deleteUser}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies
        user={currentUser}
        token={token}
        deleteMovie={deleteMovie}
      />

      <Button
        type="button"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>
    </Container>
  );
}

//Making states available as props in the component
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};
// dispatch action creators as props to child component
export default connect(mapStateToProps, {
  setFavorites,
})(ProfileView);

ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
  onBackLog: PropTypes.func.isRequired,
};
