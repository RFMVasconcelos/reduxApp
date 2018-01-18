'use strict'
import axios from 'axios';

// GET CART
export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
    .then(function(response){
      dispatch({type:"GET_CART", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_CART_REJECTED", mag:"error when getting the cart from session"})
    })
  }
}

// ADD TO CART
export function addToCart(cart){
  return function(dispatch){
    axios.post("/api/cart", cart) //http request
    .then(function(response){
      dispatch({type:"ADD_TO_CART", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"ADD_TO_CART_REJECTED"}, msg:"there was an error adding to cart")
    })
  }
  // return{
  //   type: "ADD_TO_CART",
  //   payload: book
  // }
}

export function deleteCartItem(cart){
  return function(dispatch){
    axios.post("/api/cart", cart) //http request
    .then(function(response){
      dispatch({type:"DELETE_CART_ITEM", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"DELETE_CART_ITEM_REJECTED"}, msg:"there was an error deleting an item from cart")
    })
  }
  // return{
  //   type: "DELETE_CART_ITEM",
  //   payload: cart
  // }
}

// update cart functions are in actions and not in reducers (rendering)
// just because we want to keep sessions of users, to allow a permanent
// cart per user, even if servers go down
export function updateCart(_id, unit, cart){
  // Create a copy of the current array of books in the cart
  const currentBookToUpdate = cart
  // Determine at which index in books array is the book to be deleted
  const indexToUpdate = currentBookToUpdate.findIndex(
    function(book){
      return book._id === _id;
    }
  )
  // The new state of the cart
  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate),
    newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)];

  return function(dispatch){
    axios.post("/api/cart", cartUpdate) //http request
      .then(function(response){
        dispatch({type:"UPDATE_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"UPDATE_CART_REJECTED"}, msg:"there was an error updating the cart")
      })
  }
    // return{
    //   type: "UPDATE_CART",
    //   payload:cartUpdate
    // }
}
