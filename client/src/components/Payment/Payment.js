import React, {useState} from 'react'
import './Payment.scss';
import {Box, Stepper, Step, StepLabel, StepContent} from '@mui/material'
import { useParams } from 'react-router-dom';
import Address from './Address';
import PaymentMethod from './PaymentMethod';
import CC from './CC';
import { useStateValue } from '../../Reducer/StateProvider';
import { useTranslation} from 'react-i18next';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise  = loadStripe("pk_test_51GtnobJpOEH9lhpFctDZfF8wZw48wX9menSwLsoU97gitgvOEQFCXLpzght5C27m9GSbxggi4euU8JGfptSF0uEp006DoMGGJN");

function Payment() {
  
  const {total} = useParams();
  const [{user}] = useStateValue();
  const {t} = useTranslation();

  const initialOrder={userID:user._id, name:user.name, phone:"", address:{addr:"", coords:{lat:"", lng:""}}, method:"", total:total}

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
      <Elements stripe={stripePromise}>
        <h2> {t('Payment.heading')}  </h2>

        <div className='payment_container'>
          <Box  className="payment_stepper">
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel> {t('Payment.stepper.step1.title')} </StepLabel>
                <StepContent>
                  <Address handleNext={handleNext} setOrderInfo={setOrderInfo} orderInfo={orderInfo}/>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel> {t('Payment.stepper.step2.title')}</StepLabel>
                <StepContent>
                  <PaymentMethod handleBack={handleBack} handleNext={handleNext} setOrderInfo={setOrderInfo} orderInfo={orderInfo} total={total}/>
                </StepContent>
              </Step>

              <Step>
                <StepLabel> {t('Payment.stepper.step3.title')} </StepLabel>
                <StepContent>
                  <CC handleBack={handleBack} orderInfo={orderInfo} total={total}/>
                </StepContent>
              </Step>
            </Stepper>
          </Box>
          
          <Box className='price_teller'>
            <div className='payment__total'>
              <b>{t('Cart.Receipt.total')}: {total.toLocaleString()} KIP</b>
            </div>
          </Box>
        </div>
      </Elements>
    </section>
  )
}

export default Payment