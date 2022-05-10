import React, {useState} from 'react'
import './Login.scss';
import {Row, Col, Button, Spinner} from 'react-bootstrap'
import axios from '../axios/axios'

function SignIn() {

  const initials = {username:"", password:"", cPassword:"", age:"", email:"", hint:"", firstName:"", lastName:""};

  const [signUpState, setSignUpState] = useState(false);
  const [formData, setFormData]=useState(initials);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleOnChange =(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    console.log(formData);
    setBtnLoading(true)

    if(signUpState){
      //sign up
      await axios.post('/user/signup', formData)
      .then(res=>console.log(res.data))
      .catch((error)=>alert(error))
      
      setBtnLoading(false);

    }else{
     //log in
    }
  }

  return (
    <div className='login_page'>
      <form className='px-4 py-3' onSubmit={handleSubmit}>
        <h3 className='mb-3'> {!signUpState ? "Login":"Sign Up"}</h3>
        <Row className='login_input_field'>
          {signUpState ?
            <>
              <Col xs={6}>
                <input type="text" name='firstName' placeholder='First Name...' onChange={handleOnChange}/>
              </Col>
              <Col xs={6}>
                <input type="text" name='lastName' placeholder='Last Name...' onChange={handleOnChange}/>
              </Col>
              <Col xs={6}>
                <input type="text" name='age' placeholder='Age...' onChange={handleOnChange}/>
              </Col>
              <Col xs={6}>
                <input type="text" name='email' placeholder='Email...' onChange={handleOnChange}/>
              </Col>
              <Col xs={12}>
                <input type="text" name='username' placeholder='Username...' onChange={handleOnChange}/>
              </Col>
              <Col xs={6}>
                <input type="password" name='password' placeholder='Password...' onChange={handleOnChange}/>
              </Col>
              <Col xs={6}>
                <input type="password" name='cPassword' placeholder='Confirm Password...' onChange={handleOnChange}/>
              </Col>
              <Col xs={12}>
                <input type="text" name='hint' placeholder='Hint in case of forgetting password*' onChange={handleOnChange}/>
              </Col>
            </>:
            <>
              <Col xs={12}>
                <input type="password" name="username" placeholder='Username...' onChange={handleOnChange}/>
              </Col>
              <Col xs={12}>
                <input type="password" name='password' placeholder="Password..." onChange={handleOnChange}/>
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
          <Button variant='danger' className='login_button w-50' type="reset">Cancel</Button>
        </div>

        {signUpState? 
          <p onClick={()=>setSignUpState(false)}>Go Back to Log In</p> : 
          <p onClick={()=>setSignUpState(true)}>Click to Sign Up</p>
        }
       
      </form>
    </div>
  )
}

export default SignIn