import React from 'react';

import { Nav, Navbar, Container } from 'react-bootstrap';

import logo from 'url:./MoooviesLogo.png';

import './navbar-view.scss';

class NavbarView extends React.Component {

render() {
    let { user } = this.props;

    const logOut = () => {
        onLoggedOut();
    }

    return (
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
              <Nav.Link href={`/films`}>Films</Nav.Link>
              <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
              <Nav.Link href="#logout" onClick={logOut}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
    }
}

export default NavbarView;