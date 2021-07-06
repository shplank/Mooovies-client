import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from './welcome-logo.png';

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
    <div className="LoginForm">
    <Media>
        <img width={290} src={logo} alt="Mooovies logo" />
    <Media.Body className="pl-4">
      <p className="mt-5">If you have an account, please log in:</p>
      <Form className="mt-2">
        <Form.Label>
          Username:
          <input className="ml-1" type="text" value={Username} onChange={e => setUsername(e.target.value)} />
        </Form.Label>
        <br></br>
        <Form.Label>
          Password:
          <input className="ml-2" type="password" value={Password} onChange={e => setPassword(e.target.value)} />
        </Form.Label>
        <br></br>
        <Button className="Button" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>
      <p className="mt-3">Or create an account here.</p>
    </Media.Body>
    </Media>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
};
