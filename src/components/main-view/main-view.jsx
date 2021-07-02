import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      <Row className="main-view justify-content-md-center">
        {selectedFilm
          ? (
            <Col md={8}>
              <FilmView film={selectedFilm} onBackClick={newSelectedFilm => { this.setSelectedFilm(newSelectedFilm); }} />
            </Col>
          )
          : films.map(film => (
              <Col md={3}>
                <FilmCard key={film._id} film={film} onFilmClick={(newSelectedFilm) => { this.setSelectedFilm(newSelectedFilm) }} />
              </Col>
          ))
        }
      </Row>
    );
  }
}
