import React from 'react';
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button';

import './film-view.scss';

export class FilmView extends React.Component {

  render() {
    const { film, onBackClick } = this.props;

    return (
      <Media className="mt-5">
        <img
          width={220}
          className="mr-3"
          className="film-view"
          src={film.ImagePath}
          alt="film poster"
        />
        
      <Media.Body className="film-info pl-3 my-auto">
        <h5 className="film-title">
          <span className="label">Title: </span>
          <span className="value">{film.Title}</span>
        </h5>
        <div className="film-year">
          <span className="label">Release Year: </span>
          <span className="value">{film.ReleaseYear}</span>
        </div>
        <div className="film-blurb">
          <span className="label">Description: </span>
          <span className="value">{film.Description}</span>
        </div>
        <Button className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
        </Media.Body>
      </Media>
    );
  }
}
