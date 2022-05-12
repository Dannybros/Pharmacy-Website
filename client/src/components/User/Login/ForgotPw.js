import React, {useState} from 'react'
import {Row, Col, Button, Spinner} from 'react-bootstrap'
import axios from '../../axios/axios'

function ForgotPw({goToLog, openToast}) {
    const initials = {hint:"", email:"", password:"", cPassword:""};

    const [changePw, setChangePw] = useState(false);
    const [formData, setFormData] = useState(initials);
    const [btnLoading, setBtnLoading] = useState(false);

    const handleOnChange =(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleClearForm=()=>{
        setFormData(initials);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setBtnLoading(true);

        if(!changePw){
            await axios.post('/user/check-user', formData)
            .then(res=>{
              openToast({variant:"Success", header:"Info", message:"Change Into New Password"});
              setChangePw(true);
            })
            .catch((error)=>{
              openToast({variant:"Warning", header:"Warning", message:error.response.data.message})
            })
          
        }else{
            await axios.post('/user/change-pw', formData)
            .then(res=>{
                openToast({variant:"Success", header:"Info", message:"Updated Into New Password successfully !!"});
                handleClearForm();
                goToLog();
            })
            .catch((error)=>{
              openToast({variant:"Warning", header:"Warning", message:error.response.data.message})
            })
        }

        setBtnLoading(false)
    }

    return (
        <form className='px-4 py-3' onSubmit={handleSubmit}>
            <h3 className='mb-3'> Forgot Password</h3>
            <Row >
                {
                    !changePw?
                    <>
                        <Col xs={12} className='my-3'>
                            <label> Enter Email you registered</label>
                            <input type="text" name='email' placeholder='Registered Email*' value={formData.email} autoComplete="off" onChange={handleOnChange}/>
                        </Col>
                        <Col xs={12} className='mt-2 mb-3'>
                            <label> Type Hint</label>
                            <input type="text" name='hint' placeholder='Hint*' value={formData.hint} autoComplete="off" onChange={handleOnChange}/>
                        </Col>
                    </>:
                    <>
                        <Col xs={12} className='my-3'>
                            <label> Enter new password</label>
                            <input type="password" name='password' placeholder='New Password*' value={formData.password} autoComplete="off" onChange={handleOnChange}/>
                        </Col>
                        <Col xs={12} className='mt-2 mb-3'>
                            <label> Confirm new password</label>
                            <input type="password" name='cPassword' placeholder='Confirm Password*' value={formData.cPassword} autoComplete="off" onChange={handleOnChange}/>
                        </Col>
                    </>
                }

                <Button variant='primary' className='login_button w-50 mx-auto mt-2' type="submit">
                    {
                        btnLoading?
                        <Spinner animation="border" variant="light" size="sm"/>:
                        "Submit"
                    }
                </Button>

                <p onClick={goToLog}>Go Back to Log In</p> 
            </Row>
        </form>
    )
}

export default ForgotPw