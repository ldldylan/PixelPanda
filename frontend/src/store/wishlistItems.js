import jwtFetch from './jwt';
// import { loadStripe } from '@stripe/stripe-js';
import { RECEIVE_USER_LOGOUT } from './session';

// const STRIPE_PUBLISHABLE_KEY = 'pk_test_51MqM6cGsS1Xf3D6rufkufB86jmVjJmFhGhHcmDS7eL09uvHKxhgoQ8EpkIUUcXtLYSj2ju5Zu3nx7EuSHQuZUMra00rW4Zmi4H';
export const RECEIVE_WISHLISTITEMS = 'wishlistItems/RECEIVE_WISHLISTITEMS';
export const ADD_WISHLISTITEM = 'wishlistItems/ADD_WISHLISTITEMS';
export const REMOVE_WISHLISTITEM = 'wishlistItems/REMOVE_WISHLISTITEMS';
export const RECEIVE_WISHLISTITEM_ERRORS = "wishlistItems/RECEIVE_WISHLISTITEMS_ERRORS";
export const CLEAR_WISHLISTITEM_ERRORS = "wishlistItems/CLEAR_WISHLISTITEMS_ERRORS";
export const CLEAR_WISHLIST = 'wishlistItems/clear_wishlist'

const receiveWishlistItems = wishlistItems => ({
    type: RECEIVE_WISHLISTITEMS,
    wishlistItems
});

const addWishlistItem = wishlistItem => ({
    type: ADD_WISHLISTITEM,
    wishlistItem
});

const removeWishlistItem = wishlistItemId => ({
    type: REMOVE_WISHLISTITEM,
    wishlistItemId
});

export const getWishlistItem = (id) => (state) => {
    return state.wishlist ? state.wishlist[id] : null
}

export const getWishlistItems = (state) => {
    return state.wishlist !== [] ? Object.values(state.wishlist) : []
}

export const clearWishlist = () => {
    return {
        type: CLEAR_WISHLIST
    }
}

const receiveErrors = errors => ({
    type: RECEIVE_WISHLISTITEM_ERRORS,
    errors
});


export const clearWishlistItemErrors = errors => ({
    type: CLEAR_WISHLISTITEM_ERRORS,
    errors
});

export const fetchWishlistItems = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/wishlistItems');
        const wishlistItems = await res.json();
        dispatch(receiveWishlistItems(wishlistItems));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUserWishlistItems = userId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/wishlistItems/users/${userId}`);
        const userWishlistItems = await res.json();
        console.log(userWishlistItems)
        dispatch(receiveWishlistItems(userWishlistItems));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const addNewWishlistItem = (artworkData, userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/wishlistItems/users/${userId}`, {
            method: 'POST',
            body: JSON.stringify(artworkData)
        });
        const newWishlistItem = await res.json();
        dispatch(addWishlistItem(newWishlistItem));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deleteWishlistItem = wishlistItemId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/wishlistItems/${wishlistItemId}`, {
            method: 'DELETE'
        })
        dispatch(removeWishlistItem(wishlistItemId))
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }

};

export const deleteAllWishlistItems = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/wishlistItems/users/${userId}`, {
            method: 'DELETE'
        })
        dispatch(clearWishlist());
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

// export const deleteAllCartItems = (userId) => async dispatch => {
//     try {
//         const res = await jwtFetch(`/api/cartItems/users/${userId}`, {
//             method: 'DELETE'
//         })
//         dispatch(clearCart());
//     } catch (err) {
//         const resBody = await err.json();
//         if (resBody.statusCode === 400) {
//             return dispatch(receiveErrors(resBody.errors));
//         }
//     }
// }

const nullErrors = null;

export const wishlistItemErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_WISHLISTITEM_ERRORS:
            return action.errors;
        case ADD_WISHLISTITEM:
        case CLEAR_WISHLISTITEM_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const wishlistItemsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_WISHLISTITEMS:
            newState={};
            const wishlistItems = action.wishlistItems
            wishlistItems.forEach(wishlistItem => {
                newState[wishlistItem._id] = wishlistItem
            })
            return newState
        case ADD_WISHLISTITEM:
            const wishlistItem = action.wishlistItem
            return {
                ...state,
                [wishlistItem._id]: wishlistItem
            }

        case REMOVE_WISHLISTITEM:
            delete newState[action.wishlistItemId]
            return newState
        case RECEIVE_USER_LOGOUT:
            return { ...state }
        case CLEAR_WISHLIST:
            return {};
        default:
            return state;
    }
};
export default wishlistItemsReducer;