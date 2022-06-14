import React, {useState} from 'react'
import './Login.scss';
import {Row, Col, Button, Spinner, Toast, ToastContainer} from 'react-bootstrap'
import axios from '../../axios/axios'
import { useLocalStorage } from '../../../Reducer/useLocalStorage';
import ForgotPw from './ForgotPw';

function SignIn({setUser}) {
  
  const initials = {username:"", password:"", cPassword:"", age:"", email:"", hint:"", firstName:"", lastName:""};
  const [user] = useLocalStorage('User');

  const [signUpState, setSignUpState] = useState(false);
  const [showForgotPw, setShowForgotPw] = useState(false);
  const [formData, setFormData]=useState(initials);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showToast, setShowToast] = useState({state:false, variant:"", header:"", message:""});

  const handleOnChange =(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleOnClear =()=>{
    setFormData(initials);
    setBtnLoading(false);
  }
  
  const handleOnChangeOnlyNumber=(e)=>{
    if(e.target.validity.valid){
      setFormData({...formData, age: (e.target.validity.valid) ? e.target.value : formData.age});
    }
  }
  
  const changeFormState=()=>{
    setSignUpState(!signUpState);
    setFormData(initials);
  }

  const goBackToLoginFromFP=()=>{
    setShowForgotPw(false);
    setSignUpState(false);
    setFormData(initials);
  }

  const openToast =({ variant, header, message})=>{
    setShowToast({
      state:true, 
      variant:variant, 
      header:header, 
      message:message
    })
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    setBtnLoading(true)

    if(signUpState){
      //sign up
      await axios.post('/user/signup', formData)
      .then(res=>{
        openToast({variant:"Success", header:"Info", message:"Sign Up in successfully !!"});
      })
      .catch((error)=>{
        openToast({variant:"Warning", header:"Warning", message:error.response.data.message})
      })

      await setFormData(initials);
      setBtnLoading(false);

    }else{
     //log in
     await axios.post('/user/login', formData)
     .then(res=>{
        setUser(res.data.result);
        openToast({variant:"Success", header:"Info", message:"Logged in successfully !!"})
     })
     .catch((error)=>{
        openToast({variant:"Warning", header:"Warning", message:error.response.data.message})
      })

     await setFormData(initials);
     setBtnLoading(false);
    }
  }

  const ThrowToast = ()=>{
    return(
      <Toast onClose={() => setShowToast({...showToast, state:false})} show={showToast.state} bg={showToast.variant.toLowerCase()} delay={5000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{showToast.header}</strong>
          <small className="text-muted ">just now</small>
        </Toast.Header>
        <Toast.Body className={showToast.variant === 'Success'? 'text-white text-uppercase' : 'text-uppercase'}>{showToast.message}</Toast.Body>
      </Toast>
    )
  }

  return (
    <div className='login_page' key={user}>
      
      {/* toast msg */}
      <ToastContainer position="top-center" className="p-3">
        <ThrowToast/>
      </ToastContainer>

      {showForgotPw?
        <ForgotPw goToLog={goBackToLoginFromFP} openToast={openToast}/>:
        <form className='px-4 py-3' onSubmit={handleSubmit} key={user}>
          <h3 className='mb-3'> {!signUpState ? "Login":"Sign Up"}</h3>
          <Row className='login_input_field'>
            {signUpState ?
              <>
                <Col xs={6}>
                  <input type="text" name='firstName' placeholder='First Name...' value={formData.firstName} autoComplete="on" onChange={handleOnChange}/>
                </Col>
                <Col xs={6}>
                  <input type="text" name='lastName' placeholder='Last Name...' value={formData.lastName}  autoComplete="on" onChange={handleOnChange}/>
                </Col>
                <Col xs={6}>
                  <input type="text" name='age' placeholder='Age...'  pattern="[0-9]*" value={formData.age}  autoComplete="off" onChange={handleOnChangeOnlyNumber}/>
                </Col>
                <Col xs={6}>
                  <input type="text" name='email' placeholder='Email...' value={formData.email} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={12}>
                  <input type="text" name='username' placeholder='Username...' value={formData.username} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={6}>
                  <input type="password" name='password' placeholder='Password...' value={formData.password} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={6}>
                  <input type="password" name='cPassword' placeholder='Confirm Password...' value={formData.cPassword} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={12}>
                  <input type="text" name='hint' placeholder='Hint in case of forgetting password*' value={formData.hint} autoComplete="off" onChange={handleOnChange}/>
                </Col>
              </>:
              <>
                <Col xs={12}>
                  <input type="text" name="username" placeholder='Username...' value={formData.username} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={12}>
                  <input type="password" name='password' placeholder="Password..." value={formData.password} autoComplete="off" onChange={handleOnChange}/>
                </Col>
              </>
            }
          </Row>
          
          <div className='sign_btn_group'>
            <Button variant='primary' className='login_button w-50' type="submit" disabled={btnLoading}>
              {
                btnLoading?
                <Spinner animation="border" variant="light" size="sm"/>:
                signUpState? "Sign Up" : "Log In"
              }
            </Button>
            <Button variant='danger' className='login_button w-50' type="reset" onClick={handleOnClear}>Cancel</Button>
          </div>

          {signUpState? 
            <p onClick={changeFormState}>Go Back to Log In</p> : 
            <div className="d-flex justify-content-around">
              <p onClick={changeFormState}>Click to Sign Up</p>
              <p onClick={()=>setShowForgotPw(true)}>Forgot Password</p>
            </div>
          }
        </form>
      }
    </div>
  )
}

export default SignIn