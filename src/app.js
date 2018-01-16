"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// REDUX
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'; //for middleware

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

// STEP 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Menu from './components/menu';
import Footer from './components/footer'

render(
  <Provider store={store}>
    <div>
      <Menu />
      <BooksList />
      <Footer />
    </div>
  </Provider>, document.getElementById('app')
);


// IMPORT ACTIONS
import {addToCart} from './actions/cartActions'
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions'

// STEP 2 create and dispatch actions
// store.dispatch(postBooks(
// ))

// store.dispatch(deleteBooks({id: 1}))
//
// store.dispatch(updateBooks(
//   {
//   id: 2,
//   title: 'Lets learn react in 24h!'
//   }
// ))
//
// //-->> CART ACTIONS <<--
// store.dispatch(addToCart([{id: 2}]))
