import React from 'react';
import axios from 'axios';

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { Row, Col, Nav, Navbar, Spinner, Container } from 'react-bootstrap';

import logo from 'url:./MoooviesLogo.png';

import './main-view.scss';

import FilmsList from '../films-list/films-list';
import { setFilms, setUser } from '../../actions/actions';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { FilmView } from '../film-view/film-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';

class MainView extends React.Component {
  constructor() {
    super();
    /* initial state settings for MainView */
    this.state = {
      user: ''
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
    }
  }

/* This function GETs all films from the films collection */

  getFilms(token) {
    axios.get('https://moooviesapi.herokuapp.com/films', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      /* Sets films state with array of films */
      this.props.setFilms(response.data);
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
    let { films } = this.props;
    let { user } = this.state;

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

          {/* Main View */}

          <Route exact path="/" render={() => {
            if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (films.length === 0) return <Spinner animation="border" role="status" className="mt-5" />; 
            return <FilmsList films={films}/>;
          }} />

          {/* Registration View */}

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />;
            if (!user)
            return <Col xs={12} sm={10} md={8}>
              <RegistrationView />
            </Col>
          }} />

          {/* Profile View */}

          <Route exact path="/users/:Username" render={({ history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col xs={12} sm={10} md={8}>
                <ProfileView user={user} films={films}
                  onBackClick={() => history.goBack()} />
              </Col>
          }} />

          {/* Update View */}

          <Route path="/users/update/:Username" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (user)
            return <Col xs={12} sm={10} md={8}>
              <UpdateProfile user={user}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Film View */}

          <Route path="/films/:Title" render={({ match, history }) => {
            if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col xs={12} sm={10} md={8}>
                <FilmView film={films.find(m => m.Title === match.params.Title)} 
                  onBackClick={() => history.goBack()} />
              </Col>
          }} />

          {/* Genre View */}

          <Route path="/Genre/:_id" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col xs={12} sm={10} md={8}>
              <Row>
                <GenreView genre={films.find(m => m.Genre._id === match.params._id)} 
                  onBackClick={() => history.goBack()} />
              </Row>
            </Col>
          }} />

          {/* Director View */}

          <Route path="/Director/:_id" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (films.length === 0) return <div className="main-view" />;
            return <Col xs={12} sm={10} md={8}>
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

let mapStateToProps = state => {
  return { films: state.films, user: state.user }
}

export default connect(mapStateToProps, { setFilms, setUser } ) (MainView);
