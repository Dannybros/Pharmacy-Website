import React from 'react'
import './Cart.scss'
import {Container, Row, Col, Button} from 'react-bootstrap'
import testItem from '../../img/lemon.jpg'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

function Cart() {
  return (
    <div className='cart_page'>
      <Container >
        <Row>
          <Col md={8} sm={12} className="cart_list_box p-3">
            <ul>
              <li className='d-flex'>
                <CloseIcon className='del_list_btn'/>
                <img src={testItem} alt=""/>
                <div className='cart_item_info'>
                  <div className='cart_item_name'>
                    <h3>Cart Item Title</h3>
                    <Button>
                      View
                    </Button>
                  </div>

                  <div className='cart_item_price'>
                    <h3>20$</h3>
                    <div className=' cart_item_counter'>
                      <PlayArrowIcon className='item_counter_icon' style={{transform:"rotate(180deg)"}}/> 
                      0 
                      <PlayArrowIcon className='item_counter_icon'/>
                    </div>
                  </div>
                </div>
              </li>

              <li className='d-flex'>
                <CloseIcon className='del_list_btn'/>
                <img src={testItem} alt=""/>
                <div className='cart_item_info'>
                  <div className='cart_item_name'>
                    <h3>Cart Item Title</h3>
                    <Button>
                      View
                    </Button>
                  </div>

                  <div className='cart_item_price'>
                    <h3>20$</h3>
                    <div className=' cart_item_counter'>
                      <PlayArrowIcon className='item_counter_icon' style={{transform:"rotate(180deg)"}}/> 
                      0 
                      <PlayArrowIcon className='item_counter_icon'/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </Col>

          <Col md={4} sm={12} className="p-3">
            <div className='total_checkout_box'>
              <h3>Receipt</h3>
              <ul>
                <li>
                  <span> <b> Item </b> </span>
                  <span> <b> Price </b> </span>
                  <span> <b> Amount </b> </span>
                  <span> <b> Total </b> </span>
                </li>
                <li>
                  <span> holy jode medicine </span>
                  <span> 20 $ </span>
                  <span> 2 </span>
                  <span> 40,000 KIP </span>
                </li>
              </ul>
              <div className='total_checkout_btn'>
                <h5>Total : <span>4kk</span></h5>
                <Button className='py-1 px-2'>
                  Check Out
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cart