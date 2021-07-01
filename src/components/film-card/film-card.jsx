import React from 'react';
import PropTypes from 'prop-types';

export class FilmCard extends React.Component {
  render() {
    const { film, onFilmClick } = this.props;
    return (
      <div onClick={() => onFilmClick(film)} className="film-card">
        <div className="film-image">
          <img src={film.ImagePath} />
        </div>
        <div>{film.Title}</div>
      </div>
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
