export const SET_FILMS = 'SET_FILMS';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

export function setFilms(value) {
    return { type: SET_FILMS, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setUser(value) {
    return { type: SET_USER, value };
}
