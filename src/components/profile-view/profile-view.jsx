import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      Favorites: [],
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://moooviesapi.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthdate: response.data.Birthdate,
        Favorites: response.data.Favorites,
      });
    });
  }

  render() {
    const { film, user } = this.props;
    return (
      <Row className="ProfileView justify-content-md-center">
        <Col md="auto">
          <p className="mt-5">{`${this.props.user}`}'s Favorites:</p>
          <span>
            <Link to={`/`}>
              <Button variant="link">Update</Button>
            </Link>
          </span>
        </Col>
      </Row>
    );
  }
}
