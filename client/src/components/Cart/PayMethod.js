import React from 'react'
import {useNavigate} from 'react-router-dom'
import './PayMethod.scss'
import delivery from '../../img/payMethods/delivery.png'
import clerk from '../../img/payMethods/clerk.png'

function PayMethod(props) {
  const navigate = useNavigate();

  const goPaymentForm=()=>{
    navigate('/cart/payment');
  }

  const goOrderList=()=>{
    navigate('/order_list');
  }

  return (
    <div className='payMethod_page'>
        <main className="ShadyBG" onClick={props.click}/>
        <section onClick={goPaymentForm}>
          <img src={delivery} alt=""/>
          <h1>Delivery</h1>
        </section>

        <section onClick={goOrderList}> 
          <img src={clerk} alt=""/>
          <h1>Pay In The Shop</h1>
        </section>
    </div>
  )
}

export default PayMethod