import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Row, Col, Nav, Navbar, Spinner, Container } from 'react-bootstrap';

import logo from 'url:./MoooviesLogo.png';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { FilmCard } from '../film-card/film-card';
import { FilmView } from '../film-view/film-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';

export class MainView extends React.Component {
  constructor() {
    super();
    /* initial state settings for MainView */
    this.state = {
      films: [],
      user: null
    };
  }

/* This function triggers getFilms and getUsers when MainView is mounted */

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getFilms(accessToken);
    //  this.getUsers(accessToken);
    }
  }

/* This function GETs all films from the films collection */

  getFilms(token) {
    axios.get('https://moooviesapi.herokuapp.com/films', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      /* Sets films state with array of films */
      this.setState({
        films: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /* getUsers(token) {
    axios.get('https://moooviesapi.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      /* Sets users state with array of users */
  /*    this.setState({
        users: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

/* On successful login, this updates the 'user' property in state */

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getFilms(authData.token);
  }

/* This funtion clears user data from local storage */

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    /* Sets user to null */
    this.setState({
      user: null
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { films, user } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">

        <Navbar className="navbar" bg="white" expand="md" fixed="top">
          <Container>
            <Navbar.Brand href={`/`}>
              <img src={logo} alt="Mooovies logo" width="45" className="d-inline-block align-top" />
              {' '}
              Mooovies
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href={`/`}>Films</Nav.Link>
              <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
              <Nav.Link href="#logout" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

          <Route exact path="/" render={() => {
            if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                   
            if (films.length === 0) return <Spinner animation="border" role="status" className="mt-5" />; 
            return films.map(m => (
              <Col sm={5} md={3} key={m._id} className="mt-4">
                <FilmCard film={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />;
            if (!user)
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route exact path="/users/:Username" render={({ history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (films.length === 0) return <Spinner animation="border" role="status" className="mt-5" />;
            return <Col md={8}>
                <ProfileView user={user} films={films}
                  onBackClick={() => history.goBack()} />
              </Col>
          }} />

          <Route path="/users/update/:Username" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (user)
            return <Col>
              <UpdateProfile onLoggedIn={user => this.onLoggedIn(user)}
                film={films} user={user}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/films/:Title" render={({ match, history }) => {
            if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col md={8}>
                <FilmView film={films.find(m => m.Title === match.params.Title)} 
                  onBackClick={() => history.goBack()} />
              </Col>
          }} />

          <Route path="/Genre/:_id" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <Row>
                <GenreView genre={films.find(m => m.Genre._id === match.params._id)} 
                  onBackClick={() => history.goBack()} />
              </Row>
            </Col>
          }} />

          <Route path="/Director/:_id" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <Row>
                <DirectorView director={films.find(m => m.Director._id === match.params._id)} 
                  onBackClick={() => history.goBack()} />
              </Row>
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}
