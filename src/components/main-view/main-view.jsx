import React from 'react';
import axios from 'axios';

import { FilmCard } from '../film-card/film-card';

import { FilmView } from '../film-view/film-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      films: [],
      selectedFilm: null
    };
  }

  componentDidMount() {
    axios.get('https://moooviesapi.herokuapp.com/films')
      .then(response => {
        this.setState({
          films: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedFilm(film) {
    this.setState({
      selectedFilm: film
    });
  }

  render() {
    const { films, selectedFilm } = this.state;

    if (films.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedFilm
          ? <FilmView film={selectedFilm} onBackClick={newSelectedFilm => { this.setSelectedFilm(newSelectedFilm); }} />
          : films.map(film => (
            <FilmCard key={film._id} film={film} onFilmClick={(newSelectedFilm) => { this.setSelectedFilm(newSelectedFilm) }} />
          ))
        }
      </div>
    );
  }
}
