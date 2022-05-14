import React, {useState} from 'react'
import './Cart.scss'
import {Container, Row, Col, Button, Modal} from 'react-bootstrap'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useStateValue } from '../../Reducer/StateProvider';
import {useNavigate} from 'react-router-dom'
import PayMethod from './PayMethod';
import { useLocalStorage } from '../../Reducer/useLocalStorage';

function Cart() {

  const [{cart}, dispatch] =useStateValue();
  const [user] = useLocalStorage('User');
  const [showPayMethod, setShowPayMethod] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();

  const handleCart = async()=>{
    dispatch({
      type:"Clear_BASKET"
    });
  }

  const handleCartItemDel=async(id)=>{
    dispatch({
      type:"DELETE_FROM_BASKET",
      id:id
    });
  }
  
  const IncreaseItemAmount=(id)=>{
    dispatch({
      type:"QUANTITY_INCREMENT",
      id:id
    });
  }

  const DecreaseItemAmount=(id, quantity)=>{
    if(quantity>1){
      dispatch({
        type:"QUANTITY_DECREMENT",
        id:id
      });
    }else{
      dispatch({
        type:"DELETE_FROM_BASKET",
        id:id
      });
    }
  }

  const goPayment=()=>{
    if(user){
      setShowPayMethod(true);
    }else{
      setShowErrorModal(true);
    }
  }

  const handleCloseErrorModal = ()=>{
    setShowErrorModal(false);
  }
  
  return (
    <div className='cart_page'>
      {showPayMethod&&
        <PayMethod click={()=>setShowPayMethod(false)}/> 
      }

      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to log in to account to pay products</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>navigate('/user')}>
            Go To Login Page
          </Button>
        </Modal.Footer>
      </Modal>
     
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
                          <Button onClick={()=>navigate(`../product/${item.id}`)}>
                            View
                          </Button>
                          <Button variant='danger' onClick={()=>handleCartItemDel(item.id)}>
                            Del
                          </Button>
                          
                        </div>
                      </div>

                      <div className='cart_item_price'>
                        <h3>{item.price * item.quantity}$</h3>
                        <div className=' cart_item_counter'>
                          <PlayArrowIcon className='item_counter_icon' style={{transform:"rotate(180deg)"}} onClick={()=>DecreaseItemAmount(item.id, item.quantity)}/> 
                            {item.quantity}
                          <PlayArrowIcon className='item_counter_icon' onClick={()=>IncreaseItemAmount(item.id)}/>
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
                <Button className='py-1 px-2' onClick={goPayment}>
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