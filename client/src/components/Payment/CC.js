import React, {useState} from 'react';
import './Payment.scss';
import {Row, Col, Button, Spinner} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import masterCard from '../../img/cards/mastercard.png'
import jcb from '../../img/cards/jcb.png'
import america from '../../img/cards/american_express.png'
import discover from '../../img/cards/discover.png'
import visa from '../../img/cards/visa_electron.png'
import china from '../../img/cards/china_union.png'
import axios from '../axios/axios'
import Swal from 'sweetalert2'
import { useStateValue } from '../../Reducer/StateProvider';

function CC({handleBack, orderInfo}) {

    const [{cart}, dispatch] =useStateValue();
    
    const [btnPayLoad, setBtnPayLoad] = useState(false);

    
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
                        <label className='card-name' htmlFor="card-name">Card Name</label>
                        <input  className='form-control' type="text" name="cardName" id="card-name" placeholder="Card Name*" />
                    </Col>
                </Row>

                <Row className='w-100'>
                    <Col className="my-3" sm={6} xs={12}>
                        <label>Card Number</label>
                        <input className='form-control' type="text" name="cardNumber" id="card-name" placeholder="Card Number*" />
                    </Col>
                    <Col className="my-3" sm={6} xs={12}>
                        <label>Card Number</label>
                        <input className='form-control' type="text" name="cardName" id="card-name" placeholder="Card Name*"/>
                    </Col>
                </Row>
                </>:
                <p className='my-3'>
                    For Payment with <b>{orderInfo.method}</b>, Please do payment transaction delivery employee.
                </p>
            }

            <div className='mt-3'>
                <Button className="mr-2" disabled={btnPayLoad} variant="primary" type="submit"> {btnPayLoad? <Spinner animation="border" variant="light" size="sm"/> : "Finish"} </Button>
                <Button className="mx-2" variant="danger" onClick={handleBack} > Back </Button>
            </div>
        </form> 
    )
}

export default CC