'use strict'
import React from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

// import classes
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component{

  componentDidMount(){
    this.props.getBooks()
  }

  render() {
    const booksList = this.props.books.map(function(booksArr){
      return(
        // <div key={booksArr._id}>
        //   <h2>{booksArr.title}</h2>
        //   <h2>{booksArr.description}</h2>
        //   <h2>{booksArr.price}</h2>
        //   <Button bsStyle='primary'> Buy </Button>
        // </div>
        <Col xs={12} sm={6} md={4} key={booksArr._id}>
          <BookItem
            _id={booksArr._id}
            title={booksArr.title}
            description={booksArr.description}
            images={booksArr.images}
            price={booksArr.price}/>
        </Col>
      )
    })
    return(
      // <div>
      //   <h1>Hello React</h1>
      //   {booksList}
      // </div>
      <Grid>
        <Row>
          <Carousel>
        		<Carousel.Item>
        			<img width={1000} height={750} alt="1000x750" src="/images/menu1.jpg" />
        			<Carousel.Caption>
        				<h3>Welcome to Rui's Library!</h3>
        			</Carousel.Caption>
        		</Carousel.Item>
        		<Carousel.Item>
        			<img width={1980} height={1317} alt="1980x1317" src="/images/menu2.jpg" />
        		</Carousel.Item>
        	</Carousel>
        </Row>
        <Row style={{marginTop:'15px'}}>
          <Cart />
        </Row>
        <Row>
          {booksList}
        </Row>
      </Grid>
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
    getBooks:getBooks
  }, dispatch)
}
export default connect(mapStateToProps,
  mapDispatchToProps)(BooksList);
