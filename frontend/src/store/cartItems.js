import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

export const RECEIVE_CARTITEMS = "cartItems/RECEIVE_CARTITEMS";
export const RECEIVE_USER_CARTITEMS = "cartItems/RECEIVE_USER_CARTITEMS";
export const RECEIVE_NEW_CARTITEM = "cartItems/RECEIVE_NEW_CARTITEM";
export const RECEIVE_CARTITEM_ERRORS = "cartItems/RECEIVE_CARTITEM_ERRORS";
export const CLEAR_CARTITEM_ERRORS = "cartItems/CLEAR_CARTITEM_ERRORS";

const receiveCartItems = cartItems => ({
    type: RECEIVE_CARTITEMS,
    cartItems
});

const receiveUserCartItems = cartItems => ({
    type: RECEIVE_USER_CARTITEMS,
    cartItems
});

const receiveNewCartItem = cartItem => ({
    type: RECEIVE_NEW_CARTITEM,
    cartItem
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

export const fetchUserCartItems = id => async dispatch => {
    try {
        const res = await jwtFetch(`/api/cartItems/user/${id}`);
        const cartItems = await res.json();
        dispatch(receiveUserCartItems(cartItems));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const createCartItem = data => async dispatch => {
    try {
        debugger;
        const res = await jwtFetch('/api/cartItems/', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const cartItem = await res.json();

        dispatch(receiveNewCartItem(cartItem));
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
        case RECEIVE_NEW_CARTITEM:
        case CLEAR_CARTITEM_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

const cartItemsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch (action.type) {
        case RECEIVE_CARTITEMS:
            return { ...state, all: action.cartItems, new: undefined };
        case RECEIVE_USER_CARTITEMS:
            return { ...state, user: action.cartItems, new: undefined };
        case RECEIVE_NEW_CARTITEM:
            return { ...state, new: action.cartItem };
        case RECEIVE_USER_LOGOUT:
            return { ...state, user: {}, new: undefined }
        default:
            return state;
    }
};

export default cartItemsReducer;