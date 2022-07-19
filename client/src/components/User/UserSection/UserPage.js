import React, {useState} from 'react'
import './UserPage.scss'
import {Container, Row, Col, Button, Spinner, Toast, ToastContainer} from 'react-bootstrap'
import axios from '../../axios/axios'
import { useStateValue } from '../../../Reducer/StateProvider'

function UserPage() {

    const [{user}, dispatch] = useStateValue();
    const [userInfo, setUserInfo] = useState({...user, pw:""});
    const [editState, setEditState] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [showToast, setShowToast] = useState({state:false, variant:"", header:"", message:""});

    const handleOnChange =(e)=>{
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    }

    const btnDefault = ()=>{
        setUserInfo({...user, pw:""})
    }

    const btnCancelState =()=>{
        setUserInfo({...user, pw:""});
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

        await axios.post('/user/update/info', userInfo)
        .then(res=>{
            dispatch({
                type:"ADD_USER",
                user:res.data.data
            })
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
                    <label>Birthday</label>
                    <input type="date" name='birthday' placeholder='Birthday...' className='form-control' value={userInfo.birthday} onChange={handleOnChange} disabled={!editState&& true}/>
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
                    <Col xs={6}>
                        <label>New Password</label>
                        <input type="text" name='pw' placeholder='Password...' className='form-control' autoComplete="off" onChange={handleOnChange} value={userInfo.pw}/>
                    </Col>
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