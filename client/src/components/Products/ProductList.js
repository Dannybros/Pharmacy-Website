import React from 'react'
import './ProductList.scss'
import {Container, Row, Col} from 'react-bootstrap'
import test from '../../img/lemon.jpg'

function ProductList() {
  return (
    <section className='product_list_section'>
      <Container>
        <Row>
          <div className='category_box'>
            <h1>Category</h1>
          </div>
          <Col lg={3} md={4} sm={6} xs={6} className="product_item_box">
            <div className='product'>
              <img src={test} alt=""/>
              <div className='product_info_box'>
                <h4>title</h4>
                <p>
                  <span>20$</span>
                  <span>⭐⭐⭐⭐⭐</span>
                </p>
                <div className='d-flex justify-content-between'>
                  <button> View </button>
                  <button> Add Cart </button>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={3} md={4} sm={6} xs={6} className="product_item_box">
            <div className='product'></div>
          </Col> 

          <Col lg={3} md={4} sm={6} xs={6} className="product_item_box">
            <div className='product'></div>
          </Col> 

          <Col lg={3} md={4} sm={6} xs={6} className="product_item_box">
            <div className='product'></div>
          </Col>  

          <Col lg={3} md={4} sm={6} xs={6} className="product_item_box">
            <div className='product'></div>
          </Col> 
        </Row>
      </Container>
    </section>
  )
}

export default ProductList