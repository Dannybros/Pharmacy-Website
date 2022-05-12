import React, {useState} from 'react'
import './UserPage.scss'
import {Container, Row, Col, Button, Spinner, Toast, ToastContainer} from 'react-bootstrap'
import { useLocalStorage } from '../../../Reducer/useLocalStorage'
import axios from '../../axios/axios'

function UserPage() {

    const initials = {username:"", pw:"",  cpw:"", email:"", age:"", hint:"", firstName:"", lastName:""};
    const [user, setUser] = useLocalStorage("User");
    const [userInfo, setUserInfo] = useState({...initials, ...user});
    const [editState, setEditState] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [showToast, setShowToast] = useState({state:false, variant:"", header:"", message:""});

    const handleOnChange =(e)=>{
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    }
    
    const handleOnChangeOnlyNumber=(e)=>{
        if(e.target.validity.valid){
            setUserInfo({...userInfo, age: (e.target.validity.valid) ? e.target.value : userInfo.age});
        }
    }

    const btnDefault = ()=>{
        setUserInfo({...initials, ...user})
    }

    const btnCancelState =()=>{
        setUserInfo({...initials, ...user});
        setEditState(false);
    }

    const openToast =({ variant, header, message})=>{
        setShowToast({
          state:true, 
          variant:variant, 
          header:header, 
          message:message
        })
    }

    const updateUserInfo =async()=>{
        setBtnLoading(true)

        await axios.post('/user/update-all', userInfo)
        .then(res=>{
            setUser(res.data.data);
            openToast({variant:"Success", header:"Info", message:"Info Updated Successfully !!"});
            setEditState(false);
        })
        .catch(err=>{
            openToast({variant:"Warning", header:"Warning", message:err.response.data.message})
        })

        setBtnLoading(false)
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
        <Container className='user_page'>

            {/* toast msg */}
            <ToastContainer position="top-center" className="p-3">
                <ThrowToast/>
            </ToastContainer>

            <h2>User Information</h2>
            <Row>
                <Col xs={6}>
                    <label>ID</label>
                    <input type="text" name='firstName' value={userInfo._id} className='form-control' placeholder='First Name*' autoComplete="on" onChange={handleOnChange} disabled/>
                </Col>
                <div/>
                <Col xs={6}>
                    <label>First Name</label>
                    <input type="text" name='firstName' value={userInfo.firstName} className='form-control' placeholder='First Name*' autoComplete="on" onChange={handleOnChange} disabled={!editState&& true}/>
                </Col>
                <Col xs={6}>
                    <label>Last Name</label>
                    <input type="text" name='lastName' value={userInfo.lastName} className='form-control' placeholder='Last Name*' autoComplete="on" onChange={handleOnChange} disabled={!editState&& true}/>
                </Col>
                <Col xs={6}>
                    <label>Age</label>
                    <input type="text" name='age' placeholder='Age...' pattern="[0-9]*" className='form-control' value={userInfo.age}  autoComplete="off" onChange={handleOnChangeOnlyNumber} disabled={!editState&& true}/>
                </Col>
                <Col xs={6}>
                    <label>Email</label>
                    <input type="text" name='email' placeholder='Email...' className='form-control' value={userInfo.email} autoComplete="off" onChange={handleOnChange} disabled={!editState&& true}/>
                </Col>
                <Col xs={6}>
                    <label>Username</label>
                    <input type="text" name='username' placeholder='Username...' className='form-control' value={userInfo.username} autoComplete="off" onChange={handleOnChange} disabled={!editState&& true}/>
                </Col>
                <Col xs={6}>
                    <label>Hint</label>
                    <input type="text" name='hint' placeholder='Hint in case of forgetting password*' className='form-control' value={userInfo.hint} autoComplete="off" onChange={handleOnChange} disabled={!editState&& true}/>
                </Col>
                {
                    editState&&
                    <>
                        <Col xs={6}>
                            <label>New Password</label>
                            <input type="password" name='pw' placeholder='Password...' className='form-control' autoComplete="off" onChange={handleOnChange} value={userInfo.pw}/>
                        </Col>
                        <Col xs={6}>
                            <label>Confirm Password</label>
                            <input type="password" name='cpw' placeholder='Password...' className='form-control' autoComplete="off" onChange={handleOnChange}  value={userInfo.cpw}/>
                        </Col>
                    </>
                }
                
            </Row>

            <div className='d-flex mt-4 btn_box'>
                {
                    !editState?
                    <Button variant='success' className='login_button' onClick={()=>setEditState(true)}>Edit Info</Button>:
                    <>
                    <Button variant='primary' className='login_button' onClick={updateUserInfo}>
                    {
                        btnLoading?
                        <Spinner animation="border" variant="light" size="sm"/>:
                        "Save"
                    }
                    </Button>
                    <Button variant='warning' className='login_button' onClick={btnDefault}>Default</Button>
                    <Button variant='danger' className='login_button' onClick={btnCancelState}>Cancel</Button>
                    </>
                }
            </div>
        </Container>
    )
}

export default UserPage