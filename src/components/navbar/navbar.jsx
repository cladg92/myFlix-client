import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar, Container, Nav } from "react-bootstrap";

class NavBar extends Component {
  isAuth() {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  }

  render() {
    const { onBackLog, user } = this.props;
    return (
      <Navbar className="main-nav" sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="navbar-logo" href="/">
            MyFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {this.isAuth() && <Nav.Link href="/">Movies</Nav.Link>}
              {this.isAuth() && (
                <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
              )}
              {this.isAuth() && (
                <Nav.Link onClick={() => onBackLog()}>Logout</Nav.Link>
              )}
              {!this.isAuth() && <Nav.Link href="/">Login</Nav.Link>}
              {!this.isAuth() && <Nav.Link href="/register">Register</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

NavBar.propTypes = {
  user: PropTypes.string,
  onBackLog: PropTypes.func.isRequired,
};
