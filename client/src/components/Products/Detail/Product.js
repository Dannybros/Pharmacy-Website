import React, {useEffect, useState} from 'react'
import './Product.scss';
import '../../Home/Home.scss'
import Swal from 'sweetalert2'
import {Rating, Stack, Typography} from '@mui/material'
import {Row, Col, Button, Modal} from 'react-bootstrap'
import Magnifier from "react-magnifier";
import {useParams} from 'react-router-dom'
import { useStateValue } from '../../../Reducer/StateProvider';
import axios from '../../axios/axios'
import Review from './Review';
import ReviewList from './ReviewList';
import { useTranslation } from 'react-i18next';

function Product() {

  const {productId} = useParams();

  const [{cart, lang}, dispatch] = useStateValue();
  const [data, setData] = useState(null);
  const [rating, setRating] = useState(0);
  const [collapseText, setCollapseText] = useState('-webkit-box');
  const [collapseTextMsg, setCollapseTextMsg] = useState('Show More 🔼');
  const [amount, setAmount] = useState(0);
  const [modalAmount, setModalAmount] = useState(false);
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
        setRating(res.data.rating);
      })
    }

    fetchRating();
  }, [productId])

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
    if (data.quantity < amount){
      alert("We don't have that much amount")
    }else{
      if(amount>0){
        await dispatch({
          type:"ADD_TO_BASKET",
          item: data,
          amount:amount,
        });
    
        setModalAmount(false)
        
        Swal.fire({
          title: 'success',
          text: "Added to Basket !",
          icon: 'success',
        })
      } else alert("Please State Amount higher than 0")
    }
  }

  function checkItemInCart(id){
    const index = cart.findIndex(prod => prod._id === id);
    if(index <0) return false
    return true
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
                <div className='space_indent'><span className="price_tag">{data?.price.toLocaleString()} KIP</span></div>
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
              <Button variant='warning' disabled={checkItemInCart(data._id)} onClick={()=>setModalAmount(true)}>  
                {t('Shop.btn2')}
              </Button>
            </Col>
        </Row>
      }

      <Review id={productId}/>
      
      <ReviewList id={productId}/>

      <Modal
        show={modalAmount}
        onHide={() => setModalAmount(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            State Amount ({data?.quantity})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="number" className='form-control' name="amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddToCart}>Add</Button>
        </Modal.Footer>
      </Modal>
     
    </div>
  )
}

export default Product