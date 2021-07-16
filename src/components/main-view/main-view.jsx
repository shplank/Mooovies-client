import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import logo from 'url:./MoooviesLogo.png';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { FilmCard } from '../film-card/film-card';
import { FilmView } from '../film-view/film-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      films: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getFilms(accessToken);
    }
  }

  getFilms(token) {
    axios.get('https://moooviesapi.herokuapp.com/films', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        films: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getFilms(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
            <Navbar.Brand href="#home">
              <img src={logo} alt="Mooovies logo" width="45" className="d-inline-block align-top" />
              {' '}
              Mooovies
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="#films">Films</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#logout" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      
          <Route exact path="/" render={() => {
            if (!user) return
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (films.length === 0) return <div className="main-view" />;
            return films.map(m => (
              <Col sm={5} md={3} key={m._id}>
                <FilmCard film={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/films/:filmId" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <FilmView film={films.find(m => m._id === match.params.filmId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={films.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={films.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}
