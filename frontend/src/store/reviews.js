import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';


export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
export const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
export const RECEIVE_ARTWORK_REVIEWS = "reviews/RECEIVE_ARTWORK_REVIEWS";
export const RECEIVE_NEW_REVIEW = "reviews/RECEIVE_NEW_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "reviews/RECEIVE_REVIEW_ERRORS";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW"
export const CLEAR_REVIEW_ERRORS = "reviews/CLEAR_REVIEW_ERRORS";

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
})

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveArtworkReviews = reviews => ({
    type: RECEIVE_ARTWORK_REVIEWS,
    reviews
});

// const receiveNewArtwork = artwork => ({
//     type: RECEIVE_NEW_ARTWORK,
//     artwork
// });

const removeReview = reviewId => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

const receiveErrors = errors => ({
    type: RECEIVE_REVIEW_ERRORS,
    errors
});

export const clearReviewErrors = errors => ({
    type: CLEAR_REVIEW_ERRORS,
    errors
});
export const getReview = (id) => (state) => {
    
    return state.reviews ? state.reviews[id] : null
}

export const getReviews = (state) => {
    // console.log(state, 'state')

    // if (state === undefined) {
    //     return [];
    // }
    // console.log(state, 'state')

    // console.log(state.reviews, 'state.reviews')
    return state.reviews.length !== 0 ? Object.values(state.reviews) : [];
}

export const fetchReview = (reviewId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/reviews/${reviewId}`);
        const review = await res.json();
        dispatch(receiveReview(review));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchReviews = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/reviews');
        const reviews = await res.json();
        dispatch(receiveReviews(reviews));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchArtworkReviews = artworkId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/reviews/artworks/${artworkId}`);
        const reviews = await res.json();
        // console.log(reviews, 'reviews')
        dispatch(receiveReviews(reviews));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const createReview = data => async dispatch => {
    try {
        const res = await jwtFetch(`/api/reviews/artwork/${data.artworkId}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const review = await res.json();

        dispatch(receiveReview(review));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const updateReview = (data, reviewId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/reviews/${reviewId}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });

        const review = await res.json();
        dispatch(receiveReview(review));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deleteReview = reviewId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        });

        dispatch(removeReview(reviewId));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

const nullErrors = null;

export const reviewErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_REVIEW_ERRORS:
            return action.errors;
        case RECEIVE_NEW_REVIEW:
        case CLEAR_REVIEW_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const reviewsReducer = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_REVIEW:
            const review = action.review
            return {
                ...state,
                [review._id]: review
            };
        case RECEIVE_REVIEWS:
            newState = {};
            const reviews = action.reviews
            reviews.forEach(review => {
                newState[review._id] = review
            })
            return newState
        case REMOVE_REVIEW:
            delete newState[action.reviewId]
            return newState
        // case RECEIVE_ARTWORK_REVIEWS:
        //     // newState={};
        //     const artReviews = action.reviews
        //     artReviews.forEach(review => {
        //         newState[review._id] = review
        //     })
        // case RECEIVE_USER_ARTWORKS:
        //     return { ...state, user: action.artworks, new: undefined };
        // case RECEIVE_NEW_ARTWORK:
        //     return { ...state, new: action.artwork };
        // case RECEIVE_USER_LOGOUT:
        //     return { ...state, user: {}, new: undefined }
        default:
            return state;
    }
};

export default reviewsReducer;