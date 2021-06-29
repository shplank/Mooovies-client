import React from 'react';

export class FilmView extends React.Component {

  render() {
    const { film, onBackClick } = this.props;

    return (
      <div className="film-view">
        <div className="film-image">
          <img src={film.ImagePath} />
        </div>
        <div className="film-title">
          <span className="label">Title: </span>
          <span className="value">{film.Title}</span>
        </div>
        <div className="film-year">
          <span className="label">Release Year: </span>
          <span className="value">{film.ReleaseYear}</span>
        </div>
        <div className="film-blurb">
          <span className="label">Description: </span>
          <span className="value">{film.Description}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}
