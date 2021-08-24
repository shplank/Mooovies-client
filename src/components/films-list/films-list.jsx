import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { FilmCard } from '../film-card/film-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function FilmsList(props) {
    const { films, visibilityFilter } = props;
    let filteredFilms = films;

    if (visibilityFilter !== '') {
        filteredFilms = films.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!films) return <div className="main-view" />;
    
    return <>
    <Col md={12} className="mt-5" style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredFilms.map(m => (
        <Col sm={5} md={3} key={m._id} >
            <FilmCard film={m} />
        </Col>
    ))}
    </>;
}

export default connect(mapStateToProps)(FilmsList);
