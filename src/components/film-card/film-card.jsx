import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './film-card.scss';

export class FilmCard extends React.Component {
  render() {
    const { film, onFilmClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={film.ImagePath} />
        <Card.Body>
          <Card.Title>{film.Title}</Card.Title>
          <Card.Text>{film.ReleaseYear}</Card.Text>
          <Button onClick={() => onFilmClick(film)} variant="link">Open</Button>
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
  }).isRequired,
  onFilmClick: PropTypes.func.isRequired
};
