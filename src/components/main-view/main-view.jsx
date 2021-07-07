import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from './MoooviesLogo.png';

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
      selectedFilm: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://moooviesapi.herokuapp.com/films')
      .then(response => {
        this.setState({
          films: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedFilm(film) {
    this.setState({
      selectedFilm: film
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { films, user, selectedFilm } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (films.length === 0) return <div className="main-view" />;

    return (
      <Container>
        <Navbar className="navbar" bg="white" expand="md" fixed="top">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt="Mooovies logo"
                src={logo}
                width="45"
                className="d-inline-block align-top"
              />{' '}
              Mooovies
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="#films">Films</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      
      <div className="main-view">
        {selectedFilm
          ? (
            <Row className="justify-content-md-center">
              <Col md={8}>
                <FilmView film={selectedFilm} onBackClick={newSelectedFilm => { this.setSelectedFilm(newSelectedFilm); }} />
              </Col>
            </Row>
          ) 
          : (
            <Row className="justify-content-md-center">
              {films.map(film => (
                <Col md={3}>
                  <FilmCard key={film._id} film={film} onFilmClick={(newSelectedFilm) => { this.setSelectedFilm(newSelectedFilm) }} />
                </Col>
              ))}
            </Row>
            )
          }
        </div>
      </Container>
    );
  }
}
