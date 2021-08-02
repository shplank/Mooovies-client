import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './film-view.scss';

export class FilmView extends React.Component {

  render() {
    const { film, genre, director, onBackClick } = this.props;

    return (
      <Media className="mt-5">
        <img className="film-view" className="mr-3" src={film.ImagePath} alt="film poster" width={220} />
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
          <div>
            <span className="value">
              <Link to={`/genres/${film.Genre}`}>
                <Button variant="link">Genre</Button>
              </Link>
            </span>
          </div>
          <div>
            <span className="value">
              <Link to={`/directors/${film.Director}`}>
                <Button variant="link">Director</Button>
              </Link>
            </span>
          </div>
          <div>
            <Button className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
          </div>
        </Media.Body>
      </Media>
    );
  }
}

FilmView.propTypes = {
  film: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
