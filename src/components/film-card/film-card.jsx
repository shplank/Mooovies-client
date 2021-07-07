import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './film-card.scss';

export class FilmCard extends React.Component {
  render() {
    const { film, onFilmClick } = this.props;

    return (
      <Card className="mt-5">
        <Card.Img className="card-image" variant="top" src={film.ImagePath} />
        <Card.Body>
          <Card.Title className="card-title">{film.Title}</Card.Title>
          <Card.Text>{film.ReleaseYear}</Card.Text>
          <Button className="open-button" onClick={() => onFilmClick(film)} variant="link">Open</Button>
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
