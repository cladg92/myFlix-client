import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UpdateUser(props) {
  const {
    username,
    password,
    usernameErr,
    passwordErr,
    email,
    emailErr,
    updateUser,
    deleteUser,
    setUsername,
    setPassword,
    setEmail,
    setBirthDate,
    birthDate,
  } = props;
  return (
    <div className="update-user">
      <h5>Update profile</h5>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Change username"
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
            placeholder="Change e-mail"
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
            placeholder="Change password"
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
          variant="warning"
          type="submit"
          onClick={deleteUser}
        >
          Delete profile
        </Button>
      </Form>
    </div>
  );
}

export default UpdateUser;
