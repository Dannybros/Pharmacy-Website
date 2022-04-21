import React, {useEffect, useState} from 'react'
import './Product.scss';
import CarouselBox from '../Home/Carousel'
import '../Home/Home.scss'
import {Row, Col, Button} from 'react-bootstrap'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
function Product() {

  const [data, setData] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [collapseText, setCollapseText] = useState('-webkit-box');
  const [collapseTextMsg, setCollapseTextMsg] = useState('Show More 🔼');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("Items"));
    setData(items[2])
  }, [])

  const LowerItemAmount = ()=>{
    if(itemAmount>0) setItemAmount(itemAmount-1);
  }
  const IncreaseItemAmount = () =>{
    setItemAmount(itemAmount+1);
  }

  const handleCollapseText = ()=>{
    if(collapseText !== "-webkit-box"){
      setCollapseText('-webkit-box');
      setCollapseTextMsg('Show More 🔽');
    }else{
      setCollapseText('block');
      setCollapseTextMsg('Show less 🔼');
    }
  }
 
  return (
    
    <div className='product_detail_page'>
      <Row className='product__box'>
        <Col sm={4} xs={5} className="product_img_magnify">
          <div className='product_img_box'>
            <img src={data.image} alt=""/>
            <div className='text-center mt-2 img_msg'>
              Hover image to zoom in
            </div>
          </div>
        </Col>

        <Col sm={6} xs={7} className="product__info__box">
          <h3> {data.title} </h3>
          <div className='product_price_box'>
            price: <span className="price_tag">{data.price}$</span>
          </div>

          <div className='product_category_box'>
            category: <b>{data.category}</b> 
          </div>

          <div className='product_description_box'>
            description:
            <p style={{display:collapseText}}>
              {data.description}
            </p> 
            <span onClick={handleCollapseText}>{collapseTextMsg}</span>
          </div>

          <div className='product_rating_box'>
            Rating:
            <p>
              {Array(Math.round(4)).fill().map((_,i)=>(
                  <span key={i}>⭐</span>
              ))}
            </p> 
          </div>

          <div className="product_amount_box">
            Amount:
            <div className='product_number_cart_box'>
              <PlayArrowIcon className='item_counter_icon' style={{transform:"rotate(180deg)"}} onClick={LowerItemAmount}/> 
                {itemAmount}
              <PlayArrowIcon className='item_counter_icon' onClick={IncreaseItemAmount}/>
            </div>
          </div>
        </Col>

        <Col sm={2} xs={12} className="add_cart_box">
          <p>To buy, choose <b>Amount</b></p>
          <p>Total: <b>{data.price * itemAmount}$</b></p>
          <Button variant='warning'  disabled={itemAmount<=0}> Add to Cart </Button>
        </Col>
      </Row>

      <div className='popular__product'>
          <h1>Other products</h1>
          <CarouselBox/>
      </div>
     
    </div>
  )
}

export default Product