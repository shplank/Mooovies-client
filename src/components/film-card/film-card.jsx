import React from 'react';
import PropTypes from 'prop-types';

export class FilmCard extends React.Component {
  render() {
    const { film, onFilmClick } = this.props;
    return (
      <div className="film-card" onClick={() => { onFilmClick(film); }} >{film.Title}</div>
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
