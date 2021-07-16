import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './film-card.scss';

export class FilmCard extends React.Component {
  render() {
    const { film } = this.props;

    return (
      <Card className="mt-5">
        <Card.Img className="card-image" variant="top" src={film.ImagePath} />
        <Card.Body>
          <Card.Title className="card-title">{film.Title}</Card.Title>
          <Card.Text>{film.ReleaseYear}</Card.Text>
          <Link to={`/films/${film._id}`}>
            <Button variant="link">Open</Button>
          </Link>
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
