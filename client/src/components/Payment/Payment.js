import React, {useState} from 'react'
import './Payment.scss';
// import { CardNumberElement, CardCvcElement, CardExpiryElement} from '@stripe/react-stripe-js';
import {Container, Row, Col} from 'react-bootstrap';
import CC from './methods/CC';
import BCEL from './methods/Bcel';

function Payment() {
  const [activeTab, setActiveTab] =useState('tab1');

  const handleClick=(e)=>{
    setActiveTab(e.target.getAttribute('name'))
  }

  return (
    <div className='payment_page'>
      <Container className='payment_page_container'>
        <div className="payment_Card">
          <Row className='payment_customer_info'>
            <h1>Customer Address: </h1>

            <Col lg={6} xs={12} className="mb-2">
                <label className='my-2'>Name: </label>
                <div>
                  <input type="text" className='form-control' placeholder='Name...'/>
                </div>
            </Col>
            <Col lg={6} xs={12} className="mb-2">
                <label className='my-2'>Phone: </label>
                <div>
                <input type="text" className='form-control' placeholder='020-554-784-66'/>
                </div>
            </Col>
            <Col lg={12} xs={12}>
                <label className='my-2'>Address: </label>
                <div>
                  <textarea className='form-control' placeholder='Type Address...'/>
                </div>
            </Col>
          </Row>

          <main className='payment__method'>
            <h1>Card Payment method</h1>
            
            <ul className="tab-nav">
                <li onClick={handleClick} name="tab1" className={activeTab === 'tab1'? "active" : ""}>
                  Credit Card
                </li>
                <li onClick={handleClick} name="tab2" className={activeTab === 'tab2'? "active" : ""}>
                  BCEL ONE PAY
                </li>
            </ul>

            <section className='outlet'>
              {activeTab==='tab1'? <CC/> : <BCEL/>}
            </section>

          </main>
        </div>
        
        <div className="payment_price_check">
          <div className='payment__total'>
            <h1>Total: $330</h1>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Payment