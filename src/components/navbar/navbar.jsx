import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

class NavBar extends Component {
  render() {
    const { onBackLog } = this.props;
    return (
      <Navbar sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#movies">Movies</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#logout" onClick={() => onBackLog()}>
              Log out
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

NavBar.propTypes = {
  onBackLog: PropTypes.func.isRequired,
};
