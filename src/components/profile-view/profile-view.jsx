import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card, Button, Container } from 'react-bootstrap';

import './profile-view.scss';
import axios from 'axios';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthdate: '',
      Favorites: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const Username = localStorage.getItem('user');
    axios.get(`https://moooviesapi.herokuapp.com/users/${Username}`, {
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
      console.log(this.state.Favorites);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleRemove(film) {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://moooviesapi.herokuapp.com/favorites/${Username}/films/${film._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
        alert(film.Title + " removed from Favorites");
        window.location.reload();
    })
  }
  
  render() {
    const { onBackClick } = this.props;
    const Favorites = (this.state.Favorites);

    return (
    <Container>
      <Row className="ProfileView justify-content-md-center mt-5">
        <Col>
          <div className="user-name">
            <span className="label">Username: </span>
            <span className="value">{`${this.state.Username}`}</span>
          </div>
          <div className="user-email">
            <span className="label">Email: </span>
            <span className="value">{`${this.state.Email}`}</span>
          </div>
          <div className="user-birthdate">
            <span className="label">Birthdate: </span>
            <span className="value" type="date" dateFormat="MM/dd/yyyy">{`${this.state.Birthdate}`}</span>
          </div>
          <h4 className="mt-3">Your Favorites:</h4>
        </Col>
        <Col md="auto">
          <Button className="mt-2" href={`/users/update/${this.props.user}`}>Edit Profile</Button>
            <br/>
          <Button className="mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
        </Col>
      </Row>
      <Row>
        {Favorites.map((film) => {
          if (Favorites.length === 0) return <p>None yet!</p>;
          return (
            <Col md={4} key={film._id}>
                <Card className="mt-3">
                  <Card.Img className="card-image" variant="top" src={film.ImagePath} />
                  <Card.Body>
                    <Card.Title className="card-title">{film.Title}</Card.Title>
                    <Card.Text>{film.ReleaseYear}</Card.Text>
                    <Button className="mt-2" href={`/films/${film.Title}`}>Open</Button>
                    <Button variant="primary" type="submit" className="mt-2 ml-3" value={film._id} onClick={() => this.handleRemove(film)}>Remove</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
        })}
      </Row>
    </Container>
    );
  }
}

ProfileView.propTypes = {
  Username: PropTypes.shape({
    Favorites: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};
