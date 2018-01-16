'use strict'

export function cartReducers(state={cart:[]}, action){
  switch (action.type) {
    case "ADD_TO_CART":
    return {...state, cart:action.payload}
    break;

    case "DELETE_CART_ITEM":
    return {...state, cart:action.payload}
    break;

    case "UPDATE_CART":
    // Create a copy of the current array of books in the cart
    const currentBookToUpdate = [...state.cart]
    // Determine at which index in books array is the book to be deleted
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book){
        return book._id === action._id;
      }
    )
    // The new state of the cart
    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
    }

    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate),
      newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]

    return {...state, cart:cartUpdate}
    break;
  }
  return state
}
