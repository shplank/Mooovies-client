import React from 'react';
import axios from 'axios';

import { Container, Row, Col, Card, Button, Jumbotron } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
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
      this.getGenres(accessToken);
    }
  }

  getGenres(token) {
    axios.get(`https://moooviesapi.herokuapp.com/Genre/${this.props.genre.Genre._id}`, {
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
    const { genre, onBackClick } = this.props;
    const film = this.state.film;

    return (
      <Container>
        <Jumbotron className="genre-view pb-1 mb-1">
          <h2 className="genre-name">{genre.Genre.Name}</h2>
          <p className="genre-description">{genre.Genre.Description}</p>
          <Button id="button" className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
          <hr/>
          <h5>Films in this genre:</h5>
        </Jumbotron>
        <Row>
          {film.map((film) => {
            if (film.length === 0) return <p>None yet!</p>;
            return (
              <Col xs={12} sm={6} lg={4} key={film._id}>
                <Card className="mt-3 mb-3 ml-auto mr-auto card justify-content-center">
                  <Card.Img className="card-image" variant="top" src={film.ImagePath} />
                  <Card.Body>
                    <Card.Title className="card-title">{film.Title}</Card.Title>
                    <Card.Text className="card-text">{film.ReleaseYear}</Card.Text>
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
