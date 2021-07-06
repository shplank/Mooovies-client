import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from './welcome-logo.png';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthdate);
    props.onLoggedIn(Username);
  };

  return (
    <Media>
        <img
          width={300}
          className="ml-5"
          src={logo}
          alt="Mooovies logo"
        />
    <Media.Body className="pl-5">
      <p className="mt-5">Create an account here:</p>
        <Form>
          <Form.Label>
            Username:
            <input type="text" value={Username} onChange={e => setUsername(e.target.value)} />
          </Form.Label>
          <Form.Label>
            Password:
            <input type="password" value={Password} onChange={e => setPassword(e.target.value)} />
          </Form.Label>
          <Form.Label>
            Email:
            <input type="text" value={Email} onChange={e => setEmail(e.target.value)} />
          </Form.Label>
          <Form.Label>
            Birthdate:
            <input type="date" value={Birthdate} onChange={e => setBirthdate(e.target.value)} />
          </Form.Label>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Media.Body>
    </Media>
  );
}
