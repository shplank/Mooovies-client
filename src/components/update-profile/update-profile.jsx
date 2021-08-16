import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './update-profile.scss';

export class UpdateProfile extends React.Component {
    constructor() {
      super();
      this.state = {
        Username: null,
        Password: null,
        Email: null,
        Birthdate: null
      }
    }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }
  
  getUser(token) {
    let Username = localStorage.getItem('user');
    axios.get(`https://moooviesapi.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthdate: response.data.Birthdate,
      });
    });
  }

  handleUpdate() {
    this.setState
    e.preventDefault();
    let Username = localStorage.getItem('user');
    axios.put(`https://moooviesapi.herokuapp.com/users/${Username}`, {
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

  handleDelete() {
    const token = localStorage.getItem('token');
    let Username = localStorage.getItem('user');
    axios.delete(`https://moooviesapi.herokuapp.com/users/${Username}`, {
    headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      alert('Your account has been deleted.');
      window.open(`/`, '_self');
    })
    .catch((e) => {
      console.log(e);
    });
}

  render() {
    const { Username, Password, Email, Birthdate } = this.props;

    return (
    <Row className="ProfileForm justify-content-md-center">
      <Col md="auto">
        <p className="mt-5">Update your profile:</p>
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

            <Button variant="primary" type="submit" className="mt-2" onClick={() => this.handleUpdate()}>Submit Update</Button>
          <br/>
            <Button variant="primary" type="submit" className="mt-4" onClick={() => this.handleDelete()}>Delete Profile</Button>

        </Form>
      </Col>
    </Row>
  );
}
}

UpdateProfile.propTypes = {
  Username: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};
