import React, {useEffect, useState} from 'react'
import './Product.scss';
import CarouselBox from '../Home/Carousel'
import '../Home/Home.scss'
import {Row, Col, Button, Modal} from 'react-bootstrap'
import Magnifier from "react-magnifier";
import { useLocalStorage } from '../../Reducer/useLocalStorage';
import {useParams, useNavigate} from 'react-router-dom'
import { useStateValue } from '../../Reducer/StateProvider';

function Product() {

  const {productId} = useParams();
  const navigate = useNavigate();

  const [{cart, currency}, dispatch] = useStateValue();
  const [items] = useLocalStorage('Items');
  const [exchangeRate] = useLocalStorage("ExchangeRate")
  const [data, setData] = useState({});

  const [collapseText, setCollapseText] = useState('-webkit-box');
  const [collapseTextMsg, setCollapseTextMsg] = useState('Show More 🔼');
  const [toastMsg, setToastMsg] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    items.map((item)=>{ 
      if(item.id===parseInt(productId)){
        setData(item)
      }
      return null
    })
  }, [items, productId])

  const handleClose = () => {
    setToastMsg(false);
    navigate(-1);
  };

  const handleShow = () => setToastMsg(true);

  const handleCollapseText = ()=>{
    if(collapseText !== "-webkit-box"){
      setCollapseText('-webkit-box');
      setCollapseTextMsg('Show More 🔽');
    }else{
      setCollapseText('block');
      setCollapseTextMsg('Show less 🔼');
    }
  }

  const handleAddToCart =async()=>{
    await dispatch({
      type:"ADD_TO_BASKET",
      item: data,
    });

    handleShow();
  }

  function checkItemInCart(id){
    const index = cart.findIndex(prod => prod.id === id);
    if(index <0) return false
    return true
  }

  const getExchangeRatePrice = (price)=>{
    if(currency.abbr==="USD"){
      const newPrice = price / exchangeRate.rates.LAK;
      return Math.round(newPrice).toLocaleString();
    }

    return (Math.round(price/1000)*1000).toLocaleString();
  }
 
  return (
    
    <div className='product_detail_page'>
      <Row className='product__box'>
        <Col sm={4} xs={5} className="product_img_magnify">
          <div className='product_img_box'>
            <Magnifier src={data.image} />;
            {/* <img src={data.image} alt=""/> */}
            <div className='text-center mt-2 img_msg'>
              Hover image to zoom in
            </div>
          </div>
        </Col>

        <Col sm={6} xs={7} className="product__info__box">
          <h3> {data.title} </h3>
          <div className='product_price_box'>
            <label>Price:</label>  
            <div className='space_indent'><span className="price_tag">{getExchangeRatePrice(data.price*12353)} {currency.abbr}</span></div>
          </div>

          <div className='product_list_box'>
            <label>Category:</label>  
            <div className='space_indent'><b>{data.category}</b></div> 
          </div>

          <div className='product_list_box'>
            <label>Weight:</label>  
            <div className='space_indent'><b>328 g</b> </div>
          </div>

          <div className='product_list_box'>
            <label>Brand:</label>  
            <div className='space_indent'><b>{data.category}</b> </div>
          </div>

          <div className='product_description_box'>
            <label>Description:</label>
            <p style={{display:collapseText}}>
              {data.description}
            </p> 
            <span onClick={handleCollapseText}>{collapseTextMsg}</span>
          </div>

          <div className='product_rating_box'>
            <label>Rating:</label>
            <p>
              {Array(Math.round(4)).fill().map((_,i)=>(
                  <span key={i}>⭐</span>
              ))}
            </p> 
          </div>
        </Col>

        <Col sm={2} xs={12} className="add_cart_box">
          <p>You can't add if item is already in the cart</p>
          <Button variant='warning' disabled={checkItemInCart(data.id)} onClick={handleAddToCart}> Add to Cart </Button>
        </Col>
      </Row>

      
      <div className='popular__product'>
          <h1>Other products</h1>
          <CarouselBox/>
      </div>

      <Modal show={toastMsg} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add To Cart Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{data.title} has been added to cart successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} style={{width:"100px"}}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
     
    </div>
  )
}

export default Product