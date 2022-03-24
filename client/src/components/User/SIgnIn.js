import React, {useState} from 'react'
import './Login.scss';
import {Row, Col, Button} from 'react-bootstrap'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

function SignIn() {

  const [signUpState, setSignUpState] = useState(false);

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("ss");
  }

  return (
    <div className='login_page'>
      <form className='p-3' onSubmit={handleSubmit}>
        <h1> {!signUpState ? "Login":"Sign Up"}</h1>
        <Row className='login_input_field'>
          <Col md={12}>
            <label><PersonIcon/> Username*</label>
            <input type="text" className='form-control' name="username" placeholder='username...'/>
          </Col>
          <Col md={12}>
            <label> <LockIcon/> Password*</label>
            <input type="password" className='form-control' name='password' placeholder='password...'/>
          </Col>
          {signUpState &&
            <>
              <Col md={6}>
                <label><PersonIcon/> First Name*</label>
                <input type="text" className='form-control' name='firstName' placeholder='First Name...'/>
              </Col>
              <Col md={6}>
                <label><PersonIcon/> Second Name*</label>
                <input type="text" className='form-control' name='secondName' placeholder='Second Name...'/>
              </Col>
              <Col md={6}>
                <label><PersonIcon/> Age*</label>
                <input type="text" className='form-control' name='age' placeholder='Age...'/>
              </Col>
              <Col md={6}>
                <label><PersonIcon/> Contact Number*</label>
                <input type="text" className='form-control' name='contact' placeholder='Contact Number...'/>
              </Col>
              <Col md={12}>
                <label><PersonIcon/> Address*</label>
                <input type="text" className='form-control' name='address' placeholder='Address...'/>
              </Col>
              <Col md={6}>
                <label><PersonIcon/> UserName*</label>
                <input type="text" className='form-control' name='contact' placeholder='UserName...'/>
              </Col>
              <Col md={6}>
                <label><PersonIcon/> Password*</label>
                <input type="password" className='form-control' name='password' placeholder='Password...'/>
              </Col>
              <Col md={6}>
                <label><PersonIcon/> Confirm Password*</label>
                <input type="password" className='form-control' name='cpassword' placeholder='Confirm Password...'/>
              </Col>
            </>
          }
        </Row>
        
        <div className='d-flex' style={{gap:"10px"}}>
          <Button variant='primary' className='login_button mt-4 w-50' type="submit">
            {signUpState? "Sign Up" : "Log In"}
          </Button>
          <Button variant='danger' className='login_button mt-4 w-50' type="reset">Cancel</Button>
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