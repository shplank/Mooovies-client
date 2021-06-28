import React from 'react';

export class FilmCard extends React.Component {
  render() {
    const { film, onFilmClick } = this.props;
    return <div className="film-card" onClick={() => { onFilmClick(film); }}>{film.Title}</div>;
  }
}
