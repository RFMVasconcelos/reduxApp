'use strict'

export function booksReducers(state={
  books:
  [{
    _id: 1,
    title:'this is the book title',
    description: 'this is the book description',
    price: 43
  },
  {
    _id: 2,
    title:'this is the second book title',
    description: 'this is the second book description',
    price: 50
  }]
}, action){
  switch(action.type){

    case "POST_BOOK":
    //state = action.payload;
    //return state;
    //let books = state.concat(action.payload)
    //return books;
    return {books:[...state.books, ...action.payload]}
    break;

    case "DELETE_BOOK":
    // Create a copy of the current array of books
    const currentBookToDelete = [...state.books]
    // Determine at which index in books array is the book to be deleted
    const indexToDelete = currentBookToDelete.findIndex(
      function(book){
        //return book._id === action.payload._id; (used for returning object)
        return book._id.toString() === action.payload;
      }
    )
    //use slice to remove the book at the specified index
    return {books: [...currentBookToDelete.slice(0, indexToDelete),
      ...currentBookToDelete.slice(indexToDelete + 1)]}
      break;

      case "UPDATE_BOOK":
      // Create a copy of the current array of books
      const currentBookToUpdate = [...state.books]
      // Determine at which index in books array is the book to be deleted
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book){
          return book._id === action.payload._id;
        }
      )
      // Create a new book object with the new values and with the same
      // array index of the item we want to replace. To achieve this we
      // will use ...spread but we could use concat method too
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      }
      // This Log has the purpose to show you how newBookToUpdate looks like
      console.log("what is it newBookToUpdate", newBookToUpdate);
      // use slice to remove the book at the specified index, replace
      // with the new object and concatenate with the rest of items in the array
      return {books:[...currentBookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]}
      break;

      case "GET_BOOKS":
      return{...state, books:[...state.books]}
      break;
    }
    return state
  }
