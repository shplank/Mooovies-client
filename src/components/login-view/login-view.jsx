import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Row, Col, Form, Button } from 'react-bootstrap';

import logo from 'url:./welcome-logo.png';

import { setUser } from '../../actions/actions';

import './login-view.scss';

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://moooviesapi.herokuapp.com/login', {
      Username: Username,
      Password: Password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('No such user')
    });
  };

  return (
    <Row className="LoginForm justify-content-md-center">
      <Col md="auto">
        <img width={300} src={logo} className="mt-3" alt="Mooovies logo" />
        <p className="mt-3">Please log into your profile:</p>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Username" value={Username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button id="button" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
      </Form>
        <p className="mt-3">Or create a profile <Link id="link" to={`/register`}>here</Link>.</p>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
};

let mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser } ) (LoginView);
