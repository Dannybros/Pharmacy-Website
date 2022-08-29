import React, {useState} from 'react'
import './Login.scss';
import {Row, Col, Button, Spinner, Toast, ToastContainer} from 'react-bootstrap'
import axios from '../../axios/axios'
import ForgotPw from './ForgotPw';
import { useStateValue } from '../../../Reducer/StateProvider';
import { useTranslation } from 'react-i18next';

function SignIn() {
  
  const initials = {username:"", password:"", cPassword:"", bod:"", email:"", hint:"", name:""};

  const [{user}, dispatch]= useStateValue();
  const {t} = useTranslation();
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

    const signURL = signUpState? '/user/signup' : '/user/login';

    await axios.post(signURL, formData)
    .then(res=>{

      !signUpState&&  
        dispatch({
          type:"ADD_USER",
          user:res.data.result
        });
      
      setFormData(initials)
      openToast({variant:"Success", header:"Info", message:"Sign Up in successfully !!"});
      
    })
    .catch((error)=>{
      openToast({variant:"Warning", header:"Warning", message:error.response.data.message})
    })

    setBtnLoading(false);
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
    <div className='login_page' val={user}>
      
      {/* toast msg */}
      <ToastContainer position="top-center" className="p-3">
        <ThrowToast/>
      </ToastContainer>

      {showForgotPw?
        <ForgotPw goToLog={goBackToLoginFromFP} openToast={openToast}/>:
        <form className='px-4 py-3' onSubmit={handleSubmit}>
          <h3 className='mb-3'> {!signUpState ? "Login":"Sign Up"}</h3>
          <Row className='login_input_field'>
            {signUpState ?
              <>
                <Col xs={12}>
                  <label>Name:</label>
                  <input type="text" name='name' placeholder='Name...' value={formData.name} autoComplete="on" onChange={handleOnChange}/>
                </Col>
                <Col xs={6}>
                  <label>BirthDay:</label>
                  <input type="date" name='bod' placeholder='Birthday...' value={formData.bod} onChange={handleOnChange}/>
                </Col>
                <Col xs={6}>
                  <label>Email:</label>
                  <input type="text" name='email' placeholder='Email...' value={formData.email} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={12}>
                  <label>Username:</label>
                  <input type="text" name='username' placeholder='Username...' value={formData.username} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={6}>
                  <label>Password:</label>
                  <input type="password" name='password' placeholder='Password...' value={formData.password} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={6}>
                  <label>Confirm Password:</label>
                  <input type="password" name='cPassword' placeholder='Confirm Password...' value={formData.cPassword} autoComplete="off" onChange={handleOnChange}/>
                </Col>
                <Col xs={12}>
                  <label>Hint:</label>
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
                signUpState? t('User.signUp.btnSignUp') : t('User.signUp.btnLogin')
              }
            </Button>
            <Button variant='danger' className='login_button w-50' type="reset" onClick={handleOnClear}>
              {t('User.setting.btnCancel')} 
            </Button>
          </div>

          {signUpState? 
            <p onClick={changeFormState}>
              {t('User.signUp.redirectLogin')} 
            </p> : 
            <div className="d-flex justify-content-around">
              <p onClick={changeFormState}>
                {t('User.signUp.redirectSignUp')} 
              </p>
              <p onClick={()=>setShowForgotPw(true)}>
                {t('User.signUp.forgotPw.title')} 
              </p>
            </div>
          }
        </form>
      }
    </div>
  )
}

export default SignIn