import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card, Button, Container } from 'react-bootstrap';

import './profile-view.scss';
import axios from 'axios';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
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
      console.log(response);
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthdate: response.data.Birthdate,
        Favorites: response.data.Favorites
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleRemove(film) {
    const accessToken = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    axios.delete(`https://moooviesapi.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      console.log(response);
      alert(film.Title + " removed from your favorites");
      window.open('/users/${Username}', '_self');
    })
  }
  

  render() {
    const { films, onBackClick } = this.props;
    const { Favorites } = this.state;

    return (
    <Container>
      <Row className="ProfileView justify-content-md-center mt-5">
        <Col>
          <div className="user-name">
            <span className="label">Username: </span>
            <span className="value">{`${this.props.user}`}</span>
          </div>
          <div className="user-email">
            <span className="label">Email: </span>
            <span className="value">{`${this.state.Email}`}</span>
          </div>
          <div className="user-birthdate">
            <span className="label">Birthdate: </span>
            <span className="value">{`${this.state.Birthdate}`}</span>
          </div>
          <h4 className="mt-3">Your favorites:</h4>
        </Col>
        <Col md="auto">
          <Button className="mt-2" href={`/users/update/${this.props.user}`}>Edit Profile</Button>
            <br/>
          <Button className="mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
        </Col>
      </Row>
      <Row>
        {Favorites.length === 0 && (
          <div className="text-center m-auto">None yet!</div>
          )}
        {films.map((film) => {
        if (film._id === Favorites.find((m) => m._id === films._id)) {
          return (
            <Col md={4} key={film._id}>
                <Card className="mt-3">
                  <Card.Img className="card-image" variant="top" src={film.ImagePath} />
                  <Card.Body>
                    <Card.Title className="card-title">{film.Title}</Card.Title>
                    <Card.Text>{film.ReleaseYear}</Card.Text>
                      <Link to={`/films/${film.Title}`}>
                        <Button variant="link">Open</Button>
                      </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          }
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
