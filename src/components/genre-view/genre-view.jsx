import React from 'react';
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { film, onBackClick } = this.props;

    return (
      <Media className="mt-5">
        <img className="genre-view" className="mr-3" src={film.ImagePath} alt="film poster" width={220} />
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
        <Link to={`/directors/${film.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${film.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Button className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
        </Media.Body>
      </Media>
    );
  }
}