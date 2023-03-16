import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

export const RECEIVE_CARTITEMS = 'cartItems/RECEIVE_CARTITEMS';
export const ADD_CARTITEM = 'cartItems/ADD_CARTITEM';
export const REMOVE_CARTITEM = '/cartItemsREMOVE_CARTITEM';
export const RECEIVE_CARTITEM_ERRORS = "cartItems/RECEIVE_CARTITEM_ERRORS";
export const CLEAR_CARTITEM_ERRORS = "cartItems/CLEAR_CARTITEM_ERRORS";

const receiveCartItems = cartItems => ({
    type: RECEIVE_CARTITEMS,
    cartItems
});

const addCartItem = cartItem => ({
    type: ADD_CARTITEM,
    cartItem
});

const removeCartItem = cartItemId => ({
    type: REMOVE_CARTITEM,
    cartItemId
});

const receiveErrors = errors => ({
    type: RECEIVE_CARTITEM_ERRORS,
    errors
});

export const clearCartItemErrors = errors => ({
    type: CLEAR_CARTITEM_ERRORS,
    errors
});

export const fetchCartItems = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/cartItems');
        const cartItems = await res.json();
        dispatch(receiveCartItems(cartItems));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const fetchUserCartItems = userId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/cartItems/user/${userId}`);
        const userCartItems = await res.json();
        dispatch(receiveCartItems(userCartItems));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const addNewCartItem = (artworkId, userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/cartItems/users/${userId}`, {
            method: 'POST',
            body: JSON.stringify(artworkId)
        });
        const newCartItem = await res.json();
        dispatch(addCartItem(newCartItem));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }    
};

export const deleteCartItem = (cartItemId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/cartItems/${cartItemId}`, {
            method: 'DELETE'
        })
        dispatch(removeCartItem(cartItemId))
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
    
};

const nullErrors = null;

export const cartItemErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_CARTITEM_ERRORS:
            return action.errors;
        case ADD_CARTITEM:
        case CLEAR_CARTITEM_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const cartItemsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_CARTITEMS:
            return { ...state, all: action.cartItems, new: undefined };
        case ADD_CARTITEM:
            return { ...state, new: action.cartItem};
        case REMOVE_CARTITEM:
            delete newState[action.cartItemId]
            return newState
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {}, new: undefined }
        default:
            return state;
    }
};

export default cartItemsReducer;