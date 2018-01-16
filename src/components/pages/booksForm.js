'use strict'

import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; // to dispatch actions
import {findDOMNode} from 'react-dom'; // to allow the saving of typed data on bootstrap
import {postBooks, deleteBooks} from '../../actions/booksActions'; // action we want to dispatch



class BooksForm extends React.Component{

  handleSubmit(){
    const book=[{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value
    }]
    this.props.postBooks(book)
  }

  onDelete(){
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBooks(bookId)
  }

  render(){

    //map the list of books to dynamically present them on select deletion
    const bookList = this.props.books.map(function(booksArr){
      return(
        <option key={booksArr._id}>{booksArr._id}</option>
      )
    })

    return(
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel> Title </ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
              ref="title" />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel> Description </ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Description"
              ref="description" />
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel> Price ($)</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Price"
              ref="price" />
          </FormGroup>
          <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary"> Save book </Button>
        </Panel>
        <Panel style={{marginTop:'25px'}}>
          <FormGroup controlId="formControlSelect">
            <ControlLabel> Select book to delete </ControlLabel>
            <FormControl ref="delete" componentClass="select" placeholder="select">
              <option value="select">select</option>
              {bookList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
        </Panel>
      </Well>
    )
  }
}
function mapStateToProps(state){
  return{
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postBooks,
    deleteBooks
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
