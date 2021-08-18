import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Row, Col, Form, Button } from 'react-bootstrap';

import './update-profile.scss';

export class UpdateProfile extends React.Component {
    constructor() {
      super();
      this.state = {
        Username: '',
        Password: '',
        Email: '',
        Birthdate: '',
        UsernameError: '',
        PasswordError: '',
        EmailError: '',
        BirthdateError: ''
      }
    }
  
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }
  
  getUser(token) {
    const user = localStorage.getItem('user');
    axios.get(`https://moooviesapi.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthdate: response.data.Birthdate,
      });
      console.log(response.data)
    });
  }

  handleUpdate(token) {
    const user = localStorage.getItem('user');
    let isValid = this.formValidation();
    if (isValid) {
    axios.put(`https://moooviesapi.herokuapp.com/users/update/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthdate: this.state.Birthdate
    })
    .then(response => {
      const data = response.data;
      alert("Update successful!");
      console.log(data);
      window.location.assign(`/users/${user}`, '_self'); // so the page will open in the current tab
    })
    .catch(e => {
      console.log('Error updating the profile')
    });
  }}

  formValidation() {
    const UsernameError = {};
    const PasswordError = {};
    const EmailError = {};
    const BirthdateError = {};
    let isValid = true;

    if (this.state.Username.trim().length < 5) {
      UsernameError.UsernameShort = "Username must be at least 5 characters";
      isValid = false;
    }
    if (this.state.Password.trim().length < 5) {
      PasswordError.PasswordShort = "Password must be at least 5 characters";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.EmailNotValid = "That's not a valid email address";
      isValid = false;
    }
    if (this.state.Birthdate === '') {
      BirthdateError.BirthdateEmpty = "Please enter your birthdate";
      isValid = false;
    }
    this.setState({
    UsernameError: UsernameError,
    PasswordError: PasswordError,
    EmailError: EmailError,
    BirthdateError: BirthdateError
    })
    return isValid;
  };

  handleDelete() {
    const user = localStorage.getItem('user');
    axios.delete(`https://moooviesapi.herokuapp.com/users/${user}`, {
    headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      alert('Your profile has been deleted');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.replace('/register', '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setItem(e) {
    let { item, value } = e.target;
    this.setState({
      [item]: value
    })
  }

  render() {
    const { user } = this.props;
    const { UsernameError, PasswordError, EmailError, BirthdateError } = this.state;

    return (
    <Row className="ProfileForm justify-content-md-center">
      <Col md="auto">
        <p className="mt-5">Update your profile:</p>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder={`${this.state.Username}`} onChange={(e) => this.setItem(e)} />
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
            <Form.Control type="password" placeholder="*****" onChange={(e) => this.setItem(e)} />
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
            <Form.Control type="email" placeholder={`${this.state.Email}`} onChange={(e) => this.setItem(e)} />
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
            <Form.Control type="date" placeholder={`${this.state.Birthdate}`} onChange={(e) => this.setItem(e)} />
            {Object.keys(BirthdateError).map((key) => {
              return (
              <div key={key}>
                {BirthdateError[key]}
              </div>
              );
            })}
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
