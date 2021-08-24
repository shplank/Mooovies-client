import { combineReducers } from 'redux';

import { SET_FILTER, SET_FILMS, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function films(state = [], action) {
  switch (action.type) {
    case SET_FILMS:
      return action.value;
    default:
      return state;
  }
}

function user(state = [], action) {
    switch (action.type) {
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}

const moooviesApp = combineReducers({
    visibilityFilter, films, user
});

export default moooviesApp;
