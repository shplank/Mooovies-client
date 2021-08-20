import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Row, Col, Form, Button } from 'react-bootstrap';

import './update-profile.scss';

export function UpdateProfile(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthdate, setBirthdate] = useState('');
  const [UsernameError, setUsernameError] = useState({});
  const [PasswordError, setPasswordError] = useState({});
  const [EmailError, setEmailError] = useState({});
  const [BirthdateError, setBirthdateError] = useState({});

  const handleUpdate = (e) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    e.preventDefault();
    let isValid = formValidation();
    if (isValid) {
    axios.put(`https://moooviesapi.herokuapp.com/users/update/${user}`, {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthdate: Birthdate
    },
    { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // so the page will open in the current tab
      alert('Update successful!');
    })
    .catch(e => {
      console.log('Error updating your profile')
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

  const handleDelete = (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://moooviesapi.herokuapp.com/users/${user}`, 
      { headers: { Authorization: `Bearer ${token}` } } )
    .then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      alert('Your profile has been deleted');
      window.location.replace('/register', '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Row className="UpdateForm justify-content-md-center">
      <Col md="auto">
        <p className="mt-5">Update your profile:</p>
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

            <Button variant="primary" type="submit" className="mt-2" onClick={handleUpdate}>Submit Update</Button>
          <br/>
            <Button variant="primary" type="submit" className="mt-4" onClick={handleDelete}>Delete Profile</Button>

        </Form>
      </Col>
    </Row>
  );
}


UpdateProfile.propTypes = {
  Username: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};
