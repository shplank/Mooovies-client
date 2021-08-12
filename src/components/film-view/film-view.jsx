import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './film-view.scss';

export class FilmView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    axios.post(`https://moooviesapi.herokuapp.com/users/${Username}/movies/${this.props.film._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`Added to Favorites`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { film, onBackClick } = this.props;

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
            <span className="label">Genre:</span>
              <Link to={`/Genre/${film.Genre._id}`}>
                <Button variant="link">{film.Genre.Name}</Button>
              </Link>
            </span>
          </div>
          <div>
            <span className="value">
              <span className="label">Director:</span>
              <Link to={`/Director/${film.Director._id}`}>
                <Button variant="link">{film.Director.Name}</Button>
              </Link>
            </span>
          </div>
          <div>
            <Button className="fav-button" value={film._id} onClick={(e) => this.addFavorite(e, film)}>Add to Favorites</Button>
          </div>
          <div>
            <Button className="mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
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
