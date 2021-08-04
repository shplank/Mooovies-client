import React from 'react';
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button';

import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { film, onBackClick } = this.props;

    return (
      <div>
      <Media className="director-view mt-5">
        <img className="director-pic" className="mr-3" src={film.Director.ImagePath} alt="director photo" width={220} />
        <Media.Body className="film-info pl-3 my-auto">
        <h5 className="film-title">
          <span className="label">Name: </span>
          <span className="value">{film.Director.Name}</span>
        </h5>
        <div className="director-birth">
          <span className="label">Born: </span>
          <span className="value">{film.Director.Birth}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{film.Director.Bio}</span>
        </div>
        
        <Button className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
        </Media.Body>
      </Media>
      <hr/>
      <h5>Films by this director:</h5>
      </div>
    );
  }
}