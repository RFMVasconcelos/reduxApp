'use strict'
import React from 'react';
import {connect} from 'react-redux'; //cart will be a smart component because we need to check the cart in state
import {bindActionCreators} from 'redux'; //for delete button to work
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {deleteCartItem, updateCart} from '../../actions/cartActions';


class Cart extends React.Component{

  onDelete(_id){
    // Create a copy of the current cart
    const currentBookToDelete = this.props.cart;
    // Determine at which index in cart array is to be deleted
    const indexToDelete = currentBookToDelete.findIndex(
      function(cart){
        return cart._id === _id;
      }
    )
    //use slice to remove the book at the specified index
    let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]

    this.props.deleteCartItem(cartAfterDelete);
  }
  onIncrement(_id){
    this.props.updateCart(_id, 1);
  }
  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateCart(_id, -1);
    }
  }
  // constructor to decide wether the checout window is open in the begining
  constructor(){
    super();
    this.state={
      showModal:false
    }
  }
  open(){
    this.setState({showModal:true})
  }
  close(){
    this.setState({showModal:false})
  }

  render(){
    if(this.props.cart[0]){ //if there is a cart in array, we render
      return this.renderCart();
    }
    else {
      return this.renderEmpty();
    }
  }
  renderEmpty(){
    return(<div></div>)
  }
  renderCart(){
    const cartItemsList = this.props.cart.map(function(cartArr){
      return(
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. {cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty.
                <Label bsStyle="success">
                  {cartArr.quantity}
                </Label>
              </h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth:'300px'}}>
                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                <span>    </span>
                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)
    return(
      <Panel bsStyle='primary'>
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            Cart
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {cartItemsList}
          <Row>
            <Col xs={12}>
              <h6>Total amount: {this.props.totalAmount}</h6>
              <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                PROCEED TO CHECKOUT
              </Button>
            </Col>
          </Row>
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Checkout Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>total $: {this.props.totalAmount}</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Panel.Body>
      </Panel>
    )
  }
}
function mapStateToProps(state){
  return{
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteCartItem:deleteCartItem,
    updateCart:updateCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
