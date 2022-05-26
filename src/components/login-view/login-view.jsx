import React, { useState } from "react";
import { RegisterView } from "../register-view/register-view";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleNewUser = (e) => {
    e.preventDefault();
    console.log("register");
    return <RegisterView />;
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        className="mt-3"
        variant="success"
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </Button>{" "}
      <Button
        className="mt-3"
        variant="secondary"
        type="submit"
        onClick={handleNewUser}
      >
        Register
      </Button>
    </Form>
  );
}
