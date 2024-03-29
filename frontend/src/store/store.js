// store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import session from './session';
import errors from './errors';
import artworks from './artworks'
import users from './users'
import cartItems from './cartItems'
import reviews from './reviews'
import wishlist from './wishlistItems'
const rootReducer = combineReducers({
  session,
  errors,
  artworks,
  users,
  cartItems,
  reviews,
  wishlist
});
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;