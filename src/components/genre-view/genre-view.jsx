import React from 'react';
import Button from 'react-bootstrap/Button';
import { Jumbotron } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Jumbotron className="genre-view">
        <h2 className="genre-name">{genre.Name}</h2>
        <p>{genre.Description}</p>
        <Button className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
      </Jumbotron>
    );
  }
}
