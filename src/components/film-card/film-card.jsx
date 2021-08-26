import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './film-card.scss';

export class FilmCard extends React.Component {
  render() {
    const { film } = this.props;

    return (
      <Card className="mt-3 mb-3 ml-auto mr-auto card justify-content-center">
        <Card.Img className="card-image justify-content-center" variant="top" src={film.ImagePath} />
        <Card.Body className="justify-content-center">
          <Card.Title className="card-title">{film.Title}</Card.Title>
          <Card.Text className="card-text">{film.ReleaseYear}</Card.Text>
          <Button id="button" className="mt-2" href={`/films/${film.Title}`}>Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};
