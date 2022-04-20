import React, {useEffect, useState} from 'react'
import './Product.scss';
import {Col, Button} from 'react-bootstrap'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Product() {

  const [data, setData] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);

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
 
  return (
    
    <div className='product_detail_page'>
      <div className='product__box'>
        <Col xs={4} className="product_img_magnify">
          <img src={data.image} alt=""/>
          <div className='img_msg'>
            hover image to zoom in
          </div>
        </Col>

        <Col xs={6} className="product__info__box">
          <h3> {data.title} </h3>
          <div className='product_price_box'>
            price: <span className="price_tag">{data.price}$</span>
          </div>
          <div className='product_category_box'>
            category: <b>{data.category}</b> 
          </div>
          <div className='product_description_box'>
            description:
            <p>{data.description}</p> 
          </div>
          <div className='product_rating_box'>
            Rating:
            <p>
              {Array(Math.round(4)).fill().map((_,i)=>(
                  <b key={i}>⭐</b>
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

        <Col xs={2} className="add_cart_box">
          <p>To buy, choose <b>Amount</b></p>
          <p>Total: <b>{data.price * itemAmount}</b>$</p>
          <Button variant='warning'  disabled={itemAmount<=0}> Add to Cart </Button>
        </Col>
      </div>
    </div>
  )
}

export default Product