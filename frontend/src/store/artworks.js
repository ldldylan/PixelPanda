import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';
import { RECEIVE_USERS } from './users';

export const RECEIVE_ARTWORK = "artworks/RECEIVE_ARTWORK";
export const RECEIVE_ARTWORKS = "artworks/RECEIVE_ARTWORKS";
export const RECEIVE_USER_ARTWORKS = "artworks/RECEIVE_USER_ARTWORKS";
export const RECEIVE_NEW_ARTWORK = "artworks/RECEIVE_NEW_ARTWORK";
export const RECEIVE_ARTWORK_ERRORS = "artworks/RECEIVE_ARTWORK_ERRORS";
export const REMOVE_ARTWORK = "artworks/REMOVE_ARTWORK"
export const CLEAR_ARTWORK_ERRORS = "artworks/CLEAR_ARTWORK_ERRORS";

const receiveArtwork = artwork => ({
    type: RECEIVE_ARTWORK,
    artwork
})

export const receiveArtworks = artworks => ({
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

const removeArtwork = ArtworkId => {
    return {
        type: REMOVE_ARTWORK,
        ArtworkId
    }
}

const receiveErrors = errors => ({
    type: RECEIVE_ARTWORK_ERRORS,
    errors
});

export const clearArtworkErrors = errors => ({
    type: CLEAR_ARTWORK_ERRORS,
    errors
});
export const getArtwork = (id) => (state) => {

    return state.artworks ? state.artworks[id] : null
}

export const getArtworks = (state) => {
    return state.artworks !== [] ? Object.values(state.artworks) : []
}

export const fetchArtwork = (artworkId) => async dispatch => {
    try {
        
        const res = await jwtFetch(`/api/artworks/${artworkId}`);
        
        const artwork = await res.json();

        dispatch(receiveArtwork(artwork));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

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
    // debugger;
    try {
        const res = await jwtFetch(`/api/artworks/user/${id}`);
        const artworks = await res.json();
        // debugger;
        dispatch(receiveUserArtworks(artworks));
    } catch (err) {
        const resBody = await err.json();
        // debugger;
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const createArtwork = formData => async dispatch => {
    try {
        const res = await jwtFetch('/api/artworks/', {
            method: 'POST',
            body: formData
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

export const updateArtwork = (formData,artworkId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/artworks/${artworkId}`, {
            method: 'PATCH',
            body: formData
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

export const deleteArtwork = artworkId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/artworks/${artworkId}`, {
            method: 'DELETE'
        });

        dispatch(removeArtwork(artworkId));
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

const artworksReducer = (state = {}, action) => {
    let newState = {...state};
    
    switch (action.type) {
        case RECEIVE_ARTWORK: 
        const artwork=action.artwork
            return {
                ...state,
                [artwork._id]: artwork
            };
        case RECEIVE_ARTWORKS:
            newState = {};
            const artworks = action.artworks
            artworks.forEach(artwork => {
                newState[artwork._id] = artwork
            })
            return newState
            // return { ...state, all: action.artworks, new: undefined };
        case REMOVE_ARTWORK:
            delete newState[action.ArtworkId]
            return newState
        case RECEIVE_USER_ARTWORKS:
            newState = {};
            const userArtworks = action.artworks;
            userArtworks.forEach(artwork => {
                newState[artwork._id] = artwork
            })
            return newState;
        // case RECEIVE_NEW_ARTWORK:
        //     return { ...state, new: action.artwork };
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {}, new: undefined };
        default:
            return state;
    }
};

export default artworksReducer;