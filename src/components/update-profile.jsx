import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './profile-view.scss';

export function UpdateProfile(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('https://moooviesapi.herokuapp.com/users/:Username', {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthdate: Birthdate
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // so the page will open in the current tab
      alert("Update successful!");
    })
    .catch(e => {
      console.log('Error updating the profile')
    });
  };

  return (
    <Row className="ProfileForm justify-content-md-center">
      <Col md="auto">
        <p className="mt-5">Your profile information:</p>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Username" value={Username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={Email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBirthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control type="date" placeholder="00-00-0000" value={Birthdate} onChange={e => setBirthdate(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

UpdateProfile.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};