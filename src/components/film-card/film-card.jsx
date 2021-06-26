import React from 'react';

export class FilmCard extends React.Component {
  render() {
    const { filmInfo } = this.props;
    return <div className="film-card">{filmInfo.Title}</div>;
  }
}
