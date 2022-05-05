import React, {useState} from 'react';
import '../Payment.scss';
import {Row, Col, Button, Spinner} from 'react-bootstrap';
import masterCard from '../../../img/cards/mastercard.png'
import jcb from '../../../img/cards/jcb.png'
import america from '../../../img/cards/american_express.png'
import discover from '../../../img/cards/discover.png'
import visa from '../../../img/cards/visa_electron.png'
import china from '../../../img/cards/china_union.png'

function CC() {
    
    const [btnPayLoad, setBtnPayLoad] = useState(false);

    const handleSubmit=(e)=>{
        e.preventDefault();
        setBtnPayLoad(true)
    }

  return (
    <form className='CC_form' onSubmit={handleSubmit}>
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
    </form>
  )
}

export default CC