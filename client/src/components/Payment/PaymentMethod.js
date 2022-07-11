import React from 'react'
import {Select, MenuItem, InputLabel, FormControl, Box, Button} from '@mui/material'


function PaymentMethod({handleNext, handleBack, setOrderInfo, orderInfo}) {
  
  const options = ['Credit Card', 'Cash', 'BCEL ONE PAY'];

  const handleOnChange=(e)=>{
    setOrderInfo({...orderInfo, [e.target.name]: e.target.value});
  }

  const GoNextStep=()=>{
    if(orderInfo.method!=="") handleNext();
    else alert("Please Choose Payment Method")
  }

  return (
    <Box  sx={{ my: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
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
            <Button variant="contained" onClick={GoNextStep} sx={{ mt: 1, mr: 1 }}> Next </Button>
            <Button variant="contained" color="error" onClick={handleBack} sx={{ mt: 1, mr: 1 }}> Back </Button>
        </Box>
    </Box>
  )
}

export default PaymentMethod