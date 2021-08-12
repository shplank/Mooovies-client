import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import { Jumbotron } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();
    /// initial state set to null
    this.state = {
      film: [],
      genre: null
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
    const genre = this.props;
    axios.get(`https://moooviesapi.herokuapp.com/Genre/${genre}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        film: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Jumbotron className="genre-view pb-1 mb-1">
        <h2 className="genre-name">{genre.Genre.Name}</h2>
        <p>{genre.Genre.Description}</p>
        <Button className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
        <hr/>
        <h5>Films in this genre:</h5>
      </Jumbotron>
    );
  }
}
