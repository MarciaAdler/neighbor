import React, { useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button, Col } from "react-bootstrap";
import API from "../utils/API";
import { Redirect, Link } from "react-router-dom";
import { LOGGEDIN, SET_CURRENT_USER } from "../utils/actions";

export default function LoginForm() {
  const [state, dispatch] = useStoreContext();
  const nameRef = useRef();
  const passwordRef = useRef();
  const renderRedirect = () => {
    if (state.loggedin) {
      return <Redirect to="/home" />;
    }
  };
  function login(event) {
    event.preventDefault();
    API.getUser({
      username: nameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((results) => {
        console.log(results);
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            id: results.data.id,
            username: results.data.username,
            firstName: results.data.firstName,
            email: results.data.email,
            city: results.data.city,
            state: results.data.state,
          },
        });

        let localStorageUser = {
          id: results.data.id,
          username: results.data.username,
          firstName: results.data.firstName,
          email: results.data.email,
          city: results.data.city,
          state: results.data.state,
        };

        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(localStorageUser)
        );

        dispatch({
          type: LOGGEDIN,
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="loginform--wrapper">
      <Form className="loginform--form div-to-align">
        <Form.Group controlId="formUsername">
          <Form.Label>
            <strong>Username</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            ref={nameRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <Button
          className="button"
          variant="secondary"
          type="submit"
          onClick={login}
        >
          Sign-in
        </Button>
        <span className="ml-3">
          Click <a href="/reset">here</a> to reset password
        </span>
      </Form>
      {renderRedirect()}
    </div>
  );
}
