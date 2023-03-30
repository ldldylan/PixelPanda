import jwtFetch from './jwt';
import { loadStripe } from '@stripe/stripe-js';
import { RECEIVE_USER_LOGOUT } from './session';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51MqM6cGsS1Xf3D6rufkufB86jmVjJmFhGhHcmDS7eL09uvHKxhgoQ8EpkIUUcXtLYSj2ju5Zu3nx7EuSHQuZUMra00rW4Zmi4H';
export const RECEIVE_CARTITEMS = 'cartItems/RECEIVE_CARTITEMS';
export const ADD_CARTITEM = 'cartItems/ADD_CARTITEM';
export const REMOVE_CARTITEM = 'cartItems/REMOVE_CARTITEM';
export const RECEIVE_CARTITEM_ERRORS = "cartItems/RECEIVE_CARTITEM_ERRORS";
export const CLEAR_CARTITEM_ERRORS = "cartItems/CLEAR_CARTITEM_ERRORS";
export const CLEAR_CART = 'cartItems/clear_cart'

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

export const getCartItem = (id) => (state) => {
    return state.cartItems ? state.cartItems[id] : null
}

export const getCartItems = (state) => {
    return state.cartItems !== [] ? Object.values(state.cartItems) : []
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

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
        const res = await jwtFetch(`/api/cartItems/users/${userId}`);
        const userCartItems = await res.json();
        console.log(userCartItems)
        dispatch(receiveCartItems(userCartItems));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const addNewCartItem = (artworkData, userId) => async dispatch => {
    try {
        // debugger
        const res = await jwtFetch(`/api/cartItems/users/${userId}`, {
            method: 'POST',
            body: JSON.stringify(artworkData)
        });
        const newCartItem = await res.json();
        // debugger
        dispatch(addCartItem(newCartItem));
    } catch (err) {
        debugger
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const deleteCartItem = cartItemId => async dispatch => {
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

export const checkoutCartItems = (cartItems) => async dispatch => {
    const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
    const res = await jwtFetch(`/api/stripe/`, {
        method: 'POST',
        body: JSON.stringify({ cartItems })
    })
    const session = await res.json();
    alert("Note for testing: Please use the following test card number provided by Stripe to complete your payment: 4242 4242 4242 4242. This is a fake card number that can be used for testing purposes only. Please do not use a real card for testing.");
    stripe.redirectToCheckout({ sessionId: session.id });
}
        

export const deleteAllCartItems = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/cartItems/users/${userId}`, {
            method: 'DELETE'
        })
        dispatch(clearCart());
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

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

const cartItemsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case RECEIVE_CARTITEMS:
            const cartItems = action.cartItems
            cartItems.forEach(cartItem => {
                newState[cartItem._id] = cartItem
            })
            return newState
        case ADD_CARTITEM:
            const cartItem = action.cartItem
            return {
                ...state,
                [cartItem._id]: cartItem
            }
        // return newState[action.cartItem._id] = action.cartItem;

        case REMOVE_CARTITEM:
            delete newState[action.cartItemId]
            return newState
        case RECEIVE_USER_LOGOUT:
            return { ...state }
        case CLEAR_CART:
            return {};
        default:
            return state;
    }
};
export default cartItemsReducer;