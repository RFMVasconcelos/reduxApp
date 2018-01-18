'use strict'
import axios from 'axios';

export function postBooks(book){
  return function(dispatch){
    axios.post("/api/books", book) //http request
    .then(function(response){
      dispatch({type:"POST_BOOK", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"POST_BOOK_REJECTED"}, payload:"there was an error posting a new book")
    })
  }
  // PRE API SERVER IMPELEMENTATION WITH MONGODB
  // return{
  //   type: "POST_BOOK",
  //   payload: book
  // }
}

export function deleteBooks(id){
  return function(dispatch){
    axios.delete("/api/books/" + id)
    .then(function(response){
      dispatch({type:"DELETE_BOOK", payload: id})
    })
    .catch(function(err){
      dispatch({type:"DELETE_BOOKS_REJECTED", payload:"there was an error with deleteBooks"})
    })
  }
}

export function updateBooks(book){
  return{
    type: "UPDATE_BOOK",
    payload: book
  }
}

export function getBooks(book){
  return function(dispatch){
    axios.get("/api/books")
    .then(function(response){
      dispatch({type:"GET_BOOKS", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_BOOKS_REJECTED", payload:"there was an error with getBooks"})
    })
  }
}
