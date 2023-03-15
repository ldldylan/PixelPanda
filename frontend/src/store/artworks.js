import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

export const RECEIVE_ARTWORKS = "artworks/RECEIVE_ARTWORKS";
export const RECEIVE_USER_ARTWORKS = "artworks/RECEIVE_USER_ARTWORKS";
export const RECEIVE_NEW_ARTWORK = "artworks/RECEIVE_NEW_ARTWORK";
export const RECEIVE_ARTWORK_ERRORS = "artworks/RECEIVE_ARTWORK_ERRORS";
export const CLEAR_ARTWORK_ERRORS = "artworks/CLEAR_ARTWORK_ERRORS";

const receiveArtworks = artworks => ({
    type: RECEIVE_ARTWORKS,
    artworks
});

const receiveUserArtworks = artworks => ({
    type: RECEIVE_USER_ARTWORKS,
    artworks
});

const receiveNewArtwork = artwork => ({
    type: RECEIVE_NEW_ARTWORK,
    artwork
});

const receiveErrors = errors => ({
    type: RECEIVE_ARTWORK_ERRORS,
    errors
});

export const clearArtworkErrors = errors => ({
    type: CLEAR_ARTWORK_ERRORS,
    errors
});

export const fetchArtworks = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/artworks');
        const artworks = await res.json();
        dispatch(receiveArtworks(artworks));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUserArtworks = id => async dispatch => {
    try {
        const res = await jwtFetch(`/api/artworks/user/${id}`);
        const artworks = await res.json();
        dispatch(receiveUserArtworks(artworks));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const createArtwork = data => async dispatch => {
    // debugger
    try {
        const res = await jwtFetch('/api/artworks/', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const artwork = await res.json();

        dispatch(receiveNewArtwork(artwork));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

const nullErrors = null;

export const artworkErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_ARTWORK_ERRORS:
            return action.errors;
        case RECEIVE_NEW_ARTWORK:
        case CLEAR_ARTWORK_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const artworksReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch (action.type) {
        case RECEIVE_ARTWORKS:
            return { ...state, all: action.artworks, new: undefined };
        case RECEIVE_USER_ARTWORKS:
            return { ...state, user: action.artworks, new: undefined };
        case RECEIVE_NEW_ARTWORK:
            return { ...state, new: action.artwork };
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {}, new: undefined }
        default:
            return state;
    }
};

export default artworksReducer;