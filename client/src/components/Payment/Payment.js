import React, {useState} from 'react'
import './Payment.scss';
// import { CardNumberElement, CardCvcElement, CardExpiryElement} from '@stripe/react-stripe-js';
import {Box, Stepper, Step, StepLabel, StepContent} from '@mui/material'
import { useParams } from 'react-router-dom';
import Address from './Address';
import PaymentMethod from './PaymentMethod';
import CC from './CC';
import { useStateValue } from '../../Reducer/StateProvider';

function Payment() {
  
  const {total} = useParams();
  const [{user}] = useStateValue();

  const initialOrder={userID:user._id,name:"", phone:"", address:{addr:"", coords:{lat:"", lng:""}}, method:"", total:total}

  const [orderInfo, setOrderInfo] = useState(initialOrder);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <section className='payment_page'>
      <h2>Payment Details</h2>

      <div className='payment_container'>
        <Box  className="payment_stepper">
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel> Customer Address</StepLabel>
              <StepContent>
                <Address handleNext={handleNext} setOrderInfo={setOrderInfo} orderInfo={orderInfo}/>
              </StepContent>
            </Step>
            
            <Step>
              <StepLabel> Payment Method</StepLabel>
              <StepContent>
                <PaymentMethod handleBack={handleBack} handleNext={handleNext} setOrderInfo={setOrderInfo} orderInfo={orderInfo}/>
              </StepContent>
            </Step>

            <Step>
              <StepLabel> Customer Address</StepLabel>
              <StepContent>
                <CC handleBack={handleBack} orderInfo={orderInfo}/>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
        
        <Box className='price_teller'>
          <div className='payment__total'>
            Total: {total}
          </div>
        </Box>
      </div>
    </section>
  )
}

export default Payment