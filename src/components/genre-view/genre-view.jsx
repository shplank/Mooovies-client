import React from 'react';
import Button from 'react-bootstrap/Button';
import { Jumbotron } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { film, onBackClick } = this.props;

    return (
      <Jumbotron className="genre-view pb-1 mb-1">
        <h2 className="genre-name">{film.Genre.Name}</h2>
        <p>{film.Genre.Description}</p>
        <Button className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
        <hr/>
        <h5>Films in this genre:</h5>
      </Jumbotron>
    );
  }
}
