import React from 'react';
import ReactDOM from 'react-dom';

import './index/scss';

/* main component */

class MoooviesApplication extends React.Component {
  render() {
    return (
      <div className="mooovies">
        <div>Good morning</div>
      </div>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MoooviesApplication), container);
