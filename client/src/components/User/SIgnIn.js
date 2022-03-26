import React, {useState} from 'react'
import './Login.scss';
import {Row, Col, Button} from 'react-bootstrap'

function SignIn() {

  const [signUpState, setSignUpState] = useState(false);

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("ss");
  }

  return (
    <div className='login_page'>
      <form className='px-4 py-3' onSubmit={handleSubmit}>
        <h3 className='mb-3'> {!signUpState ? "Login":"Sign Up"}</h3>
        <Row className='login_input_field'>
          {signUpState ?
            <>
              <Col xs={6}>
                <input type="text" name='firstName' placeholder='First Name...'/>
              </Col>
              <Col xs={6}>
                <input type="text" name='secondName' placeholder='Second Name...'/>
              </Col>
              <Col xs={6}>
                <input type="text" name='age' placeholder='Age...'/>
              </Col>
              <Col xs={6}>
                <input type="text" name='contact' placeholder='Contact Number...'/>
              </Col>
              <Col xs={12}>
                <input type="text" name='address' placeholder='Address...'/>
              </Col>
              <Col xs={6}>
                <input type="text" name='contact' placeholder='Username...'/>
              </Col>
              <Col xs={6}>
                <input type="password" name='password' placeholder='Password...'/>
              </Col>
              <Col xs={12}>
                <input type="password" name='cpassword' placeholder='Confirm Password...'/>
              </Col>
            </>:
            <>
              <Col xs={12}>
                <input type="password" name="username" placeholder='Username...'/>
              </Col>
              <Col xs={12}>
                <input type="password" name='password' placeholder="Password..."/>
              </Col>
            </>
          }
        </Row>
        
        <div className='sign_btn_group'>
          <Button variant='primary' className='login_button w-50' type="submit">
            {signUpState? "Sign Up" : "Log In"}
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