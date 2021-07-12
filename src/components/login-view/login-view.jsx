import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from 'url:./welcome-logo.png';

import './login-view.scss';

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(Username);
  };

  return (
    <Row className="LoginForm justify-content-md-center">
      <Col md="auto">
        <img width={300} src={logo} alt="Mooovies logo" />
        <p>Please log into your account:</p>
        <Form>
        <Form.Label>
          Username:
          <input className="ml-1" type="text" value={Username} onChange={e => setUsername(e.target.value)} />
        </Form.Label>
        <br></br>
        <Form.Label>
          Password:
          <input className="ml-1" type="password" value={Password} onChange={e => setPassword(e.target.value)} />
        </Form.Label>
        <br></br>
        <Button className="Button mt-2" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
        <p className="mt-3">Or create an account here.</p>
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
