import React, {useState} from 'react'
import './Cart.scss'
import {Container, Row, Col, Button, Modal} from 'react-bootstrap'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useStateValue } from '../../Reducer/StateProvider';
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import CartTable from './CartTable';

function Cart() {

  const [{cart, user, lang}, dispatch] =useStateValue();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();
  const {t} = useTranslation();

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
    if(Object.keys(user).length !== 0){
      navigate(`/cart/payment/${totalCart}`);
    }else{
      setShowErrorModal(true);
    }
  }

  const handleCloseErrorModal = ()=>{
    setShowErrorModal(false);
  }

  const totalCart = cart.reduce((total, currentItem)=>{
    total += currentItem.price * currentItem.quantity;
    return total;
  }, 0)
  
  return (
    <div className='cart_page'>
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body> {t('Cart.warning')}  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            {t('Cart.close')}
          </Button>
          <Button variant="primary" onClick={()=>navigate('/user')}>
            {t('Cart.redirect')}
          </Button>
        </Modal.Footer>
      </Modal>
     
      <Container >
        <Row>
          <Col md={8} sm={12} className="cart_list_box p-3">
            <div className='d-flex justify-content-between cart_page_title'>
              <h1>   {t('Cart.title')}   </h1>
              <Button variant='danger' onClick={handleCart}>   {t('Cart.btnClear')}   </Button>
            </div>
            <ul>
              {cart.map((item)=>{
                return(
                  <li className='d-flex' key={item._id}>
                  <img src={item.img} alt=""/>
                  <div className='cart_item_info'>
                    <div className='cart_item_name'>
                      <h3>{item.name[lang]}</h3>
                      <div className='d-flex w-100 justify-content-around'>
                        <Button onClick={()=>navigate(`../product/${item._id}`)}>
                          {t('Cart.item.btnView')}
                        </Button>
                        <Button variant='danger' onClick={()=>handleCartItemDel(item._id)}>
                          {t('Cart.item.btnDel')}
                        </Button>
                      </div>
                    </div>

                    <div className='cart_item_price'>
                      <h3>{item.price * item.quantity} KIP</h3>
                      <div className=' cart_item_counter'>
                        <PlayArrowIcon className='item_counter_icon' style={{transform:"rotate(180deg)"}} onClick={()=>DecreaseItemAmount(item.id, item.quantity)}/> 
                          {item.quantity}
                        <PlayArrowIcon className='item_counter_icon' onClick={()=>IncreaseItemAmount(item.id)}/>
                      </div>
                    </div>
                  </div>
                </li>
                )
              })}
            </ul>
          </Col>

          <Col md={4} sm={12} className="p-3">
            <CartTable cart={cart} lang={lang} goPayment={goPayment}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cart