import React from 'react';
import axios from 'axios';

import { Container, Row, Col, Card, Button, Media } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();
    /// initial state set to null
    this.state = {
      film: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getDirectors(accessToken);
    }
  }

  getDirectors(token) {
    axios.get(`https://moooviesapi.herokuapp.com/Director/${this.props.director.Director._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        film: response.data
      });
      console.log(this.state.film);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const { director, onBackClick } = this.props;
    const film = this.state.film;

    return (
      <Container>
        <Media className="director-view mt-5">
          <img className="director-pic" className="mr-3" src={director.Director.ImagePath} alt="director photo" width={220} />
          <Media.Body className="film-info pl-3 my-auto">
            <h5 className="film-title">
              <span className="label">Name: </span>
              <span className="value">{director.Director.Name}</span>
            </h5>
            <div className="director-birth mt-3">
              <span className="label">Born: </span>
              <span className="value">{director.Director.Birth}</span>
            </div>
            <div className="director-bio mt-3">
              <span className="label">Bio: </span>
              <span className="value">{director.Director.Bio}</span>
            </div>
            <Button id="button" className="back-button mt-4" onClick={() => { onBackClick(null); }}>Back</Button>
          </Media.Body>
        </Media>
        <hr/>
        <h5 className="mt-3">Films by this director:</h5>
        <Row>
          {film.map((film) => {
            if (film.length === 0) return <p>None</p>;
            return (
              <Col md={4} key={film._id}>
                <Card className="mt-3">
                  <Card.Img className="card-image" variant="top" src={film.ImagePath} />
                  <Card.Body>
                    <Card.Title className="card-title">{film.Title}</Card.Title>
                    <Card.Text>{film.ReleaseYear}</Card.Text>
                    <Button id="button" className="mt-2" href={`/films/${film.Title}`}>Open</Button>
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