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
import {useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";

const inputStyle ={
    style: {
        base: {
            fontFamily: 'san serif',
            fontSmoothing: "antialiased",
            fontSize: "18px",
            "::placeholder": {
                color: "grey",
                fontSize:"16px"
            },
        },
        invalid: {
            fontFamily: 'san serif',
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    },
    placeholder:"**** **** **** ****",
    showIcon:true
}

const inputCVC ={
    style: {
        base: {
            fontFamily: 'san serif',
            fontSmoothing: "antialiased",
            fontSize: "18px",
            "::placeholder": {
                color: "grey",
                fontSize:"16px"
            }
        },
        invalid: {
            fontFamily: 'san serif',
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    },
    placeholder:"CVC"
}

const inputDate ={
    style: {
        base: {
            fontFamily: 'san serif',
            fontSmoothing: "antialiased",
            fontSize: "18px",
            "::placeholder": {
                color: "grey",
                fontSize:"16px"
            }
        },
        invalid: {
            fontFamily: 'san serif',
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    },
    placeholder:"MM/DD"
}

function CC({handleBack, orderInfo, total}) {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();
    const [{cart}, dispatch] =useStateValue();
    const [btnPayLoad, setBtnPayLoad] = useState(false);
    const {t} = useTranslation();

    const recordOrder=(formData)=>{
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

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setBtnPayLoad(true)
        
        const formData = {...orderInfo, cart:cart}

        if(orderInfo.method==="Credit Card"){
            const response = await axios.post('/stripe/clientKey', {price:parseInt(total) * 100});

            const key = await response?.data?.client_secret

            const {paymentIntent, error} = await stripe.confirmCardPayment(
                key, {
                    payment_method: {
                        card:elements.getElement(CardNumberElement),
                    }
                }
            )

            if (error && paymentIntent.status !== "succeeded") {
                alert(error.message)
                axios.post('/stripe/cancel', {id:response.data.id})
                return null
            }
        }

        recordOrder(formData);
    }

    return (
        <form className='CC_form' onSubmit={handleSubmit}>
            {orderInfo.method==="Credit Card"?
                <>
                 {/* <CardElement id="card-element" /> */}
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
                        <CardNumberElement className='form-control py-2' options={inputStyle}/>
                    </Col>
                </Row>

                <Row className='w-100'>
                    <Col className="my-3" sm={6} xs={12}>
                        <label>
                            {t('Payment.stepper.step3.method1.input2')}:
                        </label>
                        <CardExpiryElement className='form-control py-2' options={inputDate}/>
                    </Col>
                    <Col className="my-3" sm={6} xs={12}>
                        <label>
                            {t('Payment.stepper.step3.method1.input3')}:
                        </label>
                        <CardCvcElement className='form-control py-2' options={inputCVC}/>
                    </Col>
                </Row>
                </>:
                <p className='my-3'>
                    <Trans 
                    i18nKey="Payment.stepper.step3.method2" CardNumberElement
                    values={{ method: orderInfo.method, redirect:"About Us"}}
                    components={{
                        Link1: <Link to='/about' title="My link1" />
                    }}
                    />
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