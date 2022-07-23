import React, {useEffect, useState} from 'react'
import './Product.scss';
import '../../Home/Home.scss'
import {Rating, Stack, Typography} from '@mui/material'
import {Row, Col, Button, Modal} from 'react-bootstrap'
import Magnifier from "react-magnifier";
import { useLocalStorage } from '../../../Reducer/useLocalStorage';
import {useParams, useNavigate} from 'react-router-dom'
import { useStateValue } from '../../../Reducer/StateProvider';
import axios from '../../axios/axios'
import Review from './Review';
import ReviewList from './ReviewList';
import { useTranslation } from 'react-i18next';

function Product() {

  const {productId} = useParams();
  const navigate = useNavigate();

  const [{cart, currency, lang}, dispatch] = useStateValue();
  const [exchangeRate] = useLocalStorage("ExchangeRate")
  const [data, setData] = useState(null);
  const [rating, setRating] = useState(0);
  const [collapseText, setCollapseText] = useState('-webkit-box');
  const [collapseTextMsg, setCollapseTextMsg] = useState('Show More 🔼');
  const [toastMsg, setToastMsg] = useState(false);
  const {t} = useTranslation();
  
  useEffect(() => {
    const fetchItem =async()=>{
      await axios.post('/products/get-one', {id:productId})
      .then(res=>{
        setData(res.data[0]);
      })
    }

    fetchItem();
  }, [productId])

  useEffect(() => {
    const fetchRating =async()=>{
      await axios.post('/review/overall-rating', {reviewTo:productId})
      .then(res=>{
        console.log(res.rating);
        setRating(res.data.rating);
      })
    }

    fetchRating();
  }, [productId])


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
    const index = cart.findIndex(prod => prod._id === id);
    if(index <0) return false
    return true
  }

  const getExchangeRatePrice = (price)=>{
    if(currency.abbr==="USD"){
      const newPrice = price / exchangeRate.rates.LAK;
      return Math.round(newPrice).toLocaleString();
    }

    return (price).toLocaleString();
  }
 
  return (
    <div className='product_detail_page'>
      {data!==null&&
        <Row className='product__box'>
            <Col sm={4} xs={5} className="product_img_magnify">
            <div className='product_img_box'>
                <Magnifier src={data?.img} />;
                <div className='text-center mt-2 img_msg'>
                  {t('ProductInfo.zoom')}
                </div>
            </div>
            </Col>

            <Col sm={6} xs={7} className="product__info__box">
            <h3> {data?.name[lang]}</h3>
            <div className='product_price_box'>
                <label>
                  {t('ProductInfo.list1')}:
                </label>  
                <div className='space_indent'><span className="price_tag">{getExchangeRatePrice(data?.price)} {currency.abbr}</span></div>
            </div>

            <div className='product_list_box'>
                <label>  {t('ProductInfo.list2')}:  </label>  
                <div className='space_indent'><b>{data?.type[lang]}</b></div> 
            </div>

            <div className='product_list_box'>
                <label>  {t('ProductInfo.list3')}:  </label>  
                <div className='space_indent'><b>{data?.weight}</b> </div>
            </div>

            <div className='product_list_box'>
                <label>  {t('ProductInfo.list4')}:  </label>  
                <div className='space_indent'><b>{data?.brand}</b> </div>
            </div>

            <div className='product_description_box'>
                <label>  {t('ProductInfo.list5')}:  </label>
                <p style={{display:collapseText}}>
                  {data?.description[lang]}
                </p> 
                <span onClick={handleCollapseText}>{collapseTextMsg}</span>
            </div>

            <div className='product_rating_box'>
                <label>  {t('ProductInfo.list6')}:  </label>
                
                <Stack direction="row" alignItems="center" sx={{mt:1}}>
                  <Typography>{rating}</Typography> &nbsp;
                  <Rating readOnly value={rating} precision={0.5} sx={{maxWidth:60}} size="large"/>
                </Stack>
            </div>
            </Col>

            <Col sm={2} xs={12} className="add_cart_box">
            <p>  {t('ProductInfo.alert')}:  </p>
            <Button variant='warning' disabled={checkItemInCart(data._id)} onClick={handleAddToCart}>  {t('Shop.btn2')}: </Button>
            </Col>
        </Row>
      }

      <Review id={productId}/>
      
      <ReviewList id="shop"/>

      <Modal show={toastMsg} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{data?.name.en} has been added to cart successfully!</Modal.Body>
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