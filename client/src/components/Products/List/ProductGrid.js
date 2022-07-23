import React from 'react'
import {Col, Row, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../../Reducer/useLocalStorage';
import { useStateValue } from '../../../Reducer/StateProvider';

function ProductGrid({data, setShowToast}) {
    const navigate = useNavigate();

    const [exchangeRate] = useLocalStorage("ExchangeRate")
    const [{cart, currency, lang}, dispatch] = useStateValue();

    const AddToCart =(data)=>{
        if(checkItemInCart(data.id)){
          setShowToast(true)
        }else{
          dispatch({
            type:"ADD_TO_BASKET",
            item: data,
          });
        }
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
    
        return price.toLocaleString();
    }

  return (
    <Row>
        {data.map((item, i)=>{
            return(
                <Col lg={3} md={4} sm={6} xs={6} className="product_item_box" key={i}>
                  <div className='product'>
                    <img src={item.img} alt=""/>
                    <div className='product_info_box'>
                      <h4>{item.name[lang]}</h4>
                      <p>
                        <span>{getExchangeRatePrice(item.price)} {currency.abbr}</span>
                        <span>
                          {/* {Array(Math.round(item?.rating.rate)).fill().map((_,i)=>(
                              <b key={i}>⭐</b>
                          ))} */}
                        </span>
                      </p>
                      <div className='d-flex justify-content-between'>
                        <Button variant='primary' onClick={()=>navigate(`../product/${item._id}`)}> View </Button>
                        <Button variant='success' onClick={()=>AddToCart(item)} disabled={item.quantity<5? true : checkItemInCart(item._id)}> 
                          {item.quantity<5? "Out Of Stock" : "Add To Cart"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
            )
        })}
    </Row>
  )
}

export default ProductGrid