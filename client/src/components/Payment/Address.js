import React, {useState}  from 'react'
import {Row, Col, Collapse} from 'react-bootstrap'
import {Tooltip, Button, Box} from '@mui/material'

function Address({handleNext, setOrderInfo, orderInfo}) {

    const [showMapText, setShowMapText] = useState(false);

    const [enableLocation, setEnableLocation] = useState(false);

    const getCurrentLocation = ()=>{

        const onSuccess=async(location)=>{
            await setEnableLocation(true)
            setOrderInfo({...orderInfo, address:{
                addr: "",
                coords:{ 
                    lat:location.coords.latitude, 
                    lng:location.coords.longitude
                }
            }})

            console.log(location.coords);
        }

        const onError=error=>{
            setEnableLocation(false)
        }

        if(!("geolocation" in navigator)){
            onError({
                code:0,
                message:"Please Enable Location"
            })
        }
        else navigator.geolocation.getCurrentPosition(onSuccess, onError)

        setShowMapText(false);
    }
    
    const handleOnChange=(e)=>{
        setOrderInfo({...orderInfo, [e.target.name]: e.target.value});
    }

    const handleOnChangeAddress=(e)=>{
        setOrderInfo({...orderInfo, address:{
            addr: e.target.value,
            coords:{ lat:"", lng:""}
        }})
    }

    const goNextStep=()=>{
        if(orderInfo.name!=="" & orderInfo.phone!=="" & orderInfo.address.addr!=="" || orderInfo.address.coords.lat!=="" || orderInfo.address.coords.lng!==""){
            handleNext();
        }else{
            alert("Please Fill In All the Form")
        }
    }

    return (
        <div>
            <Row className='mb-3'>
                <Col sm={6} xs={12} className="mb-2">
                    <label className='my-2'>Name: </label>
                    <input type="text" className='form-control' name="name" placeholder='Name...' onChange={handleOnChange} value={orderInfo.name}/>
                </Col>
                <Col sm={6} xs={12} className="mb-2">
                    <label className='my-2'>Phone: </label>
                    <input type="text" className='form-control' name="phone" placeholder='020-554-784-66' onChange={handleOnChange} value={orderInfo.phone}
                     onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                     }}/>
                </Col>
                <Col sm={12} xs={12}>
                    <label className='my-2'>Address: </label>
                    <div>
                        <Tooltip title="Please OFF VPN" arrow>
                            <Button variant="contained" color="warning" onClick={getCurrentLocation}>Current Location</Button>
                        </Tooltip>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant='contained' color="success" onClick={()=>setShowMapText(true)}>Other Location</Button>
                    </div>

                    {showMapText?
                        <Collapse in={showMapText}>
                            <textarea className='form-control mt-3' name="addr" onChange={handleOnChangeAddress} placeholder='Describe address...' value={orderInfo.address.addr}/>
                        </Collapse> :
                        <input 
                        type="text" className='form-control mt-3' name="coords" disabled placeholder='Please Enable Location' 
                        value={orderInfo.address.coords.lat?
                            orderInfo.address.coords.lat + " "+  orderInfo.address.coords.lng:
                            enableLocation? orderInfo.address.coords.lat +" "+ orderInfo.address.coords.lng : "" 
                        }/>
                    }
                </Col>
            </Row>

            <Box sx={{ mb: 2 }}>
                <Button variant="contained" onClick={goNextStep} sx={{ mt: 1, mr: 1 }}> Continue </Button>
            </Box>
        </div>
    )
}

export default Address