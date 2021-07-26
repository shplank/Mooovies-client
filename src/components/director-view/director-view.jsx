import React from 'react';
import Media from 'react-bootstrap/Media'
import Button from 'react-bootstrap/Button';

import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Media className="director-view mt-5">
        <img className="director-pic" className="mr-3" src={director.ImagePath} alt="director photo" width={220} />
        <Media.Body className="film-info pl-3 my-auto">
        <h5 className="film-title">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </h5>
        <div className="director-birth">
          <span className="label">Born: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>
        
        <Button className="back-button mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
        </Media.Body>
      </Media>
    );
  }
}