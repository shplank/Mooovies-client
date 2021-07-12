import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from 'url:./welcome-logo.png';

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
    <Row className="RegistrationForm justify-content-md-center">
      <Col md="auto">
        <img width={300} src={logo} alt="Mooovies logo" />
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
