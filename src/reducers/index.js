'use strict'
import {combineReducers} from 'redux';

// REDUCERS TO BE COMBINED
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';

// COMBINE THE REDUCERS
export default combineReducers({
  books: booksReducers,
  cart: cartReducers
})
