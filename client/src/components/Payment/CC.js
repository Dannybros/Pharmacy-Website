import React, {useState} from 'react';
import './Payment.scss';
import {Row, Col, Button, Spinner} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom'
import masterCard from '../../img/cards/mastercard.png'
import jcb from '../../img/cards/jcb.png'
import america from '../../img/cards/american_express.png'
import discover from '../../img/cards/discover.png'
import visa from '../../img/cards/visa_electron.png'
import china from '../../img/cards/china_union.png'
import axios from '../axios/axios'
import Swal from 'sweetalert2'
import { useStateValue } from '../../Reducer/StateProvider';
import { useTranslation, Trans } from 'react-i18next';

function CC({handleBack, orderInfo}) {

    const [{cart}, dispatch] =useStateValue();
    const [btnPayLoad, setBtnPayLoad] = useState(false);
    const {t} = useTranslation();
    
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        setBtnPayLoad(true)
        
        const formData = {...orderInfo, cart:cart}

        if(orderInfo.method==="Credit Card"){

        }else{

            axios.post('/order', formData)
            .then(res=>{
                
                dispatch({
                    type:"Clear_BASKET"
                });

                Swal.fire({
                    title: 'success',
                    text: res.data.message,
                    icon: 'success',
                })

                navigate('/order_list');
            })
            .catch(err=>{
                Swal.fire({
                    title: 'error',
                    text: err.response.data.message,
                    icon: 'warning',
                  })
            })

            setBtnPayLoad(false)
        }
    }

    return (
        <form className='CC_form' onSubmit={handleSubmit}>
            {orderInfo.method==="Credit Card"?
                <>
                <div className='card_img__list'>
                    <img src={masterCard} alt="masterCard"/>
                    <img src={visa} alt="visaCard"/>
                    <img src={america} alt="americanCard"/>
                    <img src={discover} alt="discoverCard"/>
                    <img src={china} alt="chinaUnionCard"/>
                    <img src={jcb} alt="jcbCard"/>
                </div>
                <Row className='w-100'>
                    <Col className="my-3" sm={6} xs={12}>
                        <label className='card-name' htmlFor="card-name">
                            {t('Payment.stepper.step3.method1.input1')}:
                        </label>
                        <input  className='form-control' type="text" name="cardName" id="card-name" placeholder="Card Name*" />
                    </Col>
                </Row>

                <Row className='w-100'>
                    <Col className="my-3" sm={6} xs={12}>
                        <label>
                            {t('Payment.stepper.step3.method1.input2')}:
                        </label>
                        <input className='form-control' type="text" name="cardNumber" id="card-name" placeholder="Card Number*" />
                    </Col>
                    <Col className="my-3" sm={6} xs={12}>
                        <label>
                            {t('Payment.stepper.step3.method1.input3')}:
                        </label>
                        <input className='form-control' type="text" name="cardName" id="card-name" placeholder="Card Name*"/>
                    </Col>
                </Row>
                </>:
                <p className='my-3'>
                    <Trans 
                     i18nKey="Payment.stepper.step3.method2" 
                     values={{ method: orderInfo.method, redirect:"About Us"}}
                     components={{
                        Link1: <Link to='/about' title="My link1" />
                    }}
                     />
                    {/* {t('Payment.stepper.step3.method2', {method:<b>{orderInfo.method}</b>, redirect:<a href="/about">About Us</a>})} */}
                </p>
            }

            <div className='mt-3'>
                <Button className="mr-2" disabled={btnPayLoad} variant="primary" type="submit"> 
                    {btnPayLoad? <Spinner animation="border" variant="light" size="sm"/> : t('Payment.stepper.btnFInish')} 
                </Button>
                <Button className="mx-2" variant="danger" onClick={handleBack}>
                    {t('Payment.stepper.btnBack')}
                </Button>
            </div>
        </form> 
    )
}

export default CC