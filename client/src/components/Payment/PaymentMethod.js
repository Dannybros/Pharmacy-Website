import React from 'react'
import {Select, MenuItem, InputLabel, FormControl, Box, Button} from '@mui/material'
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2'

function PaymentMethod({handleNext, handleBack, setOrderInfo, orderInfo, total}) {
  
  const options = ['Credit Card', 'Cash'];
  const {t} = useTranslation();

  const handleOnChange=(e)=>{
    setOrderInfo({...orderInfo, [e.target.name]: e.target.value});
  }

  const GoNextStep=()=>{
    if(orderInfo.method!==""){
      (parseInt(total) < 10000 && orderInfo.method!=="Cash") ? 
      Swal.fire({
        title: 'error',
        text: "Total Payment has be more than 10,000 Kip to pay with Credit Card",
        icon: 'warning',
      }): handleNext();
    } 
    else alert("Please Choose Payment Method ")
  }

  return (
    <Box  sx={{ my: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {t('Payment.stepper.step2.title')}:
          </InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="method"
          label="Payment Method"
          onChange={handleOnChange}
          value={orderInfo.method}
          >
          {options.map((item, i)=>{
              return(
              <MenuItem key={i} value={item}>{item}</MenuItem>
              )
          })}
          </Select>
        </FormControl>
        <Box sx={{ my:2}}>
            <Button variant="contained" onClick={GoNextStep} sx={{ mt: 1, mr: 1 }}>
              {t('Payment.stepper.btnContinue')} 
            </Button>
            <Button variant="contained" color="error" onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              {t('Payment.stepper.btnBack')}
            </Button>
        </Box>
    </Box>
  )
}

export default PaymentMethod