import React, {useState} from 'react'
import './Payment.scss';
import { CardNumberElement, CardCvcElement, CardExpiryElement} from '@stripe/react-stripe-js';
import {Container, Row, Col, Button, Spinner} from 'react-bootstrap';
import masterCard from '../../img/cards/mastercard.png'
import jcb from '../../img/cards/jcb.png'
import america from '../../img/cards/american_express.png'
import discover from '../../img/cards/discover.png'
import visa from '../../img/cards/visa_electron.png'
import china from '../../img/cards/china_union.png'

function Payment() {
  const [activeTab, setActiveTab] =useState('tab1');
  const [btnPayLoad, setBtnPayLoad] = useState(false);

  // const elements = useElements();
  // const stripe= useStripe();

  const handleClick=(e)=>{
    setActiveTab(e.target.getAttribute('name'))
  }

  return (
    <div className='payment_page'>
      <Container className='py-5 d-flex'>
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
              <div className='card_img__list'>
                  <img src={masterCard} alt="masterCard"/>
                  <img src={visa} alt="visaCard"/>
                  <img src={america} alt="americanCard"/>
                  <img src={discover} alt="discoverCard"/>
                  <img src={china} alt="chinaUnionCard"/>
                  <img src={jcb} alt="jcbCard"/>
              </div>
              <Row className="mx-0">
                <Col className="my-2" md lg={6} xs={12}>
                    <label className='card-name' htmlFor="card-name">Card Name</label>
                    <input 
                      className='form-control'
                      type="text"
                      name="cardName"
                      id="card-name" 
                      placeholder="Card Name*"
                    />
                </Col>
              </Row>

              <Row className="mx-0">
                <Col className="my-2" md lg={6} xs={12}>
                  <label>Card Number</label>
                  <input 
                      className='form-control'
                      type="text"
                      name="cardName"
                      id="card-name" 
                      placeholder="Card Name*"
                  />
                </Col>
                <Col className="my-2" md lg={6} xs={12}>
                  <label>Card Number</label>
                  <input 
                      className='form-control'
                      type="text"
                      name="cardName"
                      id="card-name" 
                      placeholder="Card Name*"
                  />
                </Col>

                <Col className="my-3" lg={12}>
                  <Button 
                      variant="primary"
                      type="submit"
                      disabled={btnPayLoad}
                  >
                      {btnPayLoad?
                          <Spinner animation="border" variant="light" size="sm"/>
                      :
                          "Pay"
                      }
                  </Button>
                </Col>
              </Row>
            </section>
          </main>
        </div>
        
        <div className="payment_total">
        </div>
      </Container>
    </div>
  )
}

export default Payment