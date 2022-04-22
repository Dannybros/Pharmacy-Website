import React from 'react'
import './Cart.scss'
import {Container, Row, Col, Button} from 'react-bootstrap'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useStateValue } from '../../Reducer/StateProvider';

function Cart() {

  const [{cart}, dispatch] =useStateValue();

  const handleCart = async()=>{
    await dispatch({
      type:"Clear_BASKET"
    });
  }

  return (
    <div className='cart_page'>
      <Container >
        <Row>
          <Col md={8} sm={12} className="cart_list_box p-3">
            <div className='d-flex justify-content-between cart_page_title'>
              <h1>Cart</h1>
              <Button variant='danger' onClick={handleCart}>Clear All</Button>
            </div>
            <ul>
              {
                cart.map((item)=>{
                  return(
                    <li className='d-flex' key={item.id}>
                    <img src={item.image} alt=""/>
                    <div className='cart_item_info'>
                      <div className='cart_item_name'>
                        <h3>{item.title}</h3>
                        <div className='d-flex w-100 justify-content-around'>
                          <Button>
                            View
                          </Button>
                          <Button variant='danger'>
                            Del
                          </Button>
                          
                        </div>
                      </div>

                      <div className='cart_item_price'>
                        <h3>{item.price}$</h3>
                        <div className=' cart_item_counter'>
                          <PlayArrowIcon className='item_counter_icon' style={{transform:"rotate(180deg)"}}/> 
                          0 
                          <PlayArrowIcon className='item_counter_icon'/>
                        </div>
                      </div>
                    </div>
                  </li>
                  )
                })
              }
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