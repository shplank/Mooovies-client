import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Media, Row, Col, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './film-view.scss';

export class FilmView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    axios.post(`https://moooviesapi.herokuapp.com/favorites/${Username}/films/${this.props.film._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
        alert((this.props.film.Title) + " added to Favorites");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { film, onBackClick } = this.props;

    return (
      <Row className="mt-5">
        <Col xs={4} sm={6}>
          <Row className="justify-content-center mx-auto">
            <img className="film-view mx-auto" src={film.ImagePath} alt="film poster"/>
          </Row>
        </Col>
        <Col xs={8} sm={6} className="film-info my-auto">
          <h5 className="film-title">
            <span className="label">Title: </span>
            <span className="value">{film.Title}</span>
          </h5>
          <div className="film-year mt-3">
            <span className="label">Release Year: </span>
            <span className="value">{film.ReleaseYear}</span>
          </div>
          <div className="film-blurb mt-3">
            <span className="label">Description: </span>
            <span className="value">{film.Description}</span>
          </div>
          <div>
            <span className="value">
              <span className="label">Genre:</span>
              <Link to={`/Genre/${film.Genre._id}`}>
                <Button id="link-button" className="mt-1 mb-2" variant="link">{film.Genre.Name}</Button>
              </Link>
            </span>
          </div>
          <div>
            <span className="value">
              <span className="label">Director:</span>
              <Link to={`/Director/${film.Director._id}`}>
                <Button id="link-button" className="mt-1 mb-2" variant="link">{film.Director.Name}</Button>
              </Link>
            </span>
          </div>
          <div>
            <Button id="button" className="mt-2" value={film._id} onClick={(e) => this.addFavorite(e, film)}>Add to Favorites</Button>
          </div>
          <div>
            <Button id="button" className="mt-4" onClick={() => { onBackClick(null); }}>Back</Button>
          </div>
        </Col>
      </Row>
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
