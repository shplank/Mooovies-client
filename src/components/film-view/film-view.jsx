import React from 'react';

export class FilmView extends React.Component {
  render() {
    const { filmInfo } = this.props;
    return (
      <div className="film-view">
        <div className="film-image">
          <img src={filmInfo.ImagePath} />
        </div>
        <div className="film-title">
          <span className="label">Title: </span>
          <span className="value">{filmInfo.Title}</span>
        </div>
        <div className="film-blurb">
          <span className="label">Description: </span>
          <span className="value">{filmInfo.Description}</span>
        </div>
      </div>
    );
  }
}
