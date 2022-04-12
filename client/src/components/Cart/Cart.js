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

                  <div className='cart_item_price'>
                    <h3>Cart Item Title</h3>
                    <div className=' cart_item_counter'>
                      <PlayArrowIcon className='item_counter_icon' style={{transform:"rotate(180deg)"}}/> 
                      0 
                      <PlayArrowIcon className='item_counter_icon'/>
                    </div>
                    <p>20$ * 2 = <span style={{color:"#0B5ED6"}}><b>305pc</b></span> </p>
                  </div>

                  <div className='cart_item_btn_box'>
                    <Button>
                      View
                    </Button>
                    <Button variant='danger'>
                      Delete
                    </Button>
                  </div>

                </div>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={12}>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cart