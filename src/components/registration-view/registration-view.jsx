import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Row, Col, Form, Button } from 'react-bootstrap';

import logo from 'url:./welcome-logo.png';

import './registration-view.scss';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthdate, setBirthdate] = useState('');
  const [UsernameError, setUsernameError] = useState({});
  const [PasswordError, setPasswordError] = useState({});
  const [EmailError, setEmailError] = useState({});
  const [BirthdateError, setBirthdateError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = formValidation();
    if (isValid) {
    axios.post('https://moooviesapi.herokuapp.com/register', {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthdate: Birthdate
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // so the page will open in the current tab
      alert("Registration successful!");
    })
    .catch(e => {
      console.log('Error registering the user')
    });
  }
  };

  const formValidation = () => {
    const UsernameError = {};
    const PasswordError = {};
    const EmailError = {};
    const BirthdateError = {};
    let isValid = true;

    if (Username.trim().length < 5) {
      UsernameError.UsernameShort = "Username must be at least 5 characters";
      isValid = false;
    }
    if (Password.trim().length < 5) {
      PasswordError.PasswordShort = "Password must be at least 5 characters";
      isValid = false;
    }
    if (!(Email && Email.includes(".") && Email.includes("@"))) {
      EmailError.EmailNotValid = "That's not a valid email address";
      isValid = false;
    }
    if (Birthdate === '') {
      BirthdateError.BirthdateEmpty = "Please enter your birthdate";
      isValid = false;
    }
    setUsernameError(UsernameError);
    setPasswordError(PasswordError);
    setEmailError(EmailError);
    setBirthdateError(BirthdateError);
    return isValid;
  };

  return (
    <Row className="RegistrationForm justify-content-md-center">
      <Col md="auto">
        <img width={300} src={logo} className="mt-3" alt="Mooovies logo" />
        <p className="mt-3">Create a profile:</p>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Username" value={Username} onChange={e => setUsername(e.target.value)} />
            {Object.keys(UsernameError).map((key) => {
              return (
              <div key={key}>
                {UsernameError[key]}
              </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} />
            {Object.keys(PasswordError).map((key) => {
              return (
              <div key={key}>
                {PasswordError[key]}
              </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={Email} onChange={e => setEmail(e.target.value)} />
            {Object.keys(EmailError).map((key) => {
              return (
              <div key={key}>
                {EmailError[key]}
              </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formBirthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control type="date" placeholder="00-00-0000" value={Birthdate} onChange={e => setBirthdate(e.target.value)} />
            {Object.keys(BirthdateError).map((key) => {
              return (
              <div key={key}>
                {BirthdateError[key]}
              </div>
              );
            })}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>

        </Form>
        <p className="mt-3">If you already have a profile, log in <Link to={`/`}>here</Link>.</p>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};
