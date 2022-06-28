import React, {useState} from 'react'
import './Employee.scss'
import {Container, Button, Modal, Row, Col} from 'react-bootstrap'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

function Employee() {

  const initials = {name:"", email:"", phone:"", joining_date:"", address:"", salary:"", password:""};

  const [addModal, setAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [employeeData, setEmployeeData]=useState(initials);

  const handleAddModalShow = (item) => {
    setAddModal(true);
    setSelectedItem(item);
    setSelectedItem(item)
  };

  const handleAddModalClose = () => {
    setAddModal(false);
    setSelectedItem(null);
    setEmployeeData(initials);
  };

  const handleButtonSubmit=()=>{
    console.log(selectedItem!==null ? 'update' : 'add');

  }

  const handleOnChange =(e)=>{
    setEmployeeData({...employeeData, [e.target.name]: e.target.value});
  }

  return (
    <Container className='employee'>
      <div className="staffNav p-3 d-flex justify-content-between">
          <Button className="py-2" variant='primary' onClick={()=>handleAddModalShow(null)}>Add New Employee</Button>
          <form className="form-inline">
              <div className="input-group">
                  <input className="form-control" type="search" placeholder="Search..."/>
                  <div className="input-group-prepend">
                      <span className="input-group-text">
                      <i className="fas fa-search">@</i>
                      </span>
                  </div>
              </div>
          </form>
      </div>
      <div className="staff_page">
        <ul className="staff_table">
            <li className="d-flex justify-content-between staff_table_header">
                <span className="staff_list"><b>No.</b></span>
                <span className="staff_list"><b>Name</b></span>
                <span className="staff_list"><b>Phone</b></span>
                <span className="staff_list"><b>Salary</b></span>
                <span className="staff_list"><b>Password</b></span>
                <span className="staff_list"><b>Action</b></span>
            </li>
            <div className="staff_list_display">
              <li className="d-flex justify-content-between">
                  <span className="staff_list"> 1</span>
                  <span className="staff_list" style={{textTransform:"capitalize"}}> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list justify-content-around">
                    <Button variant="success" className='btn_view' onClick={()=>handleAddModalShow(null)}> <RemoveRedEyeIcon className='edit_icon'/></Button> 
                    <Button variant="danger" className='btn_view'> <DeleteIcon className='edit_icon'/></Button> 
                  </span>
              </li>
            </div>
        </ul>
      </div>

      <Modal 
        show={addModal} 
        onHide={handleAddModalClose} 
        animation={false} 
        size="lg" 
      >
        <Modal.Header>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Name:</label>
              <input type="text" className='form-control' name="name" value={employeeData.name} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Email:</label>
              <input type="text" className='form-control' name="email" value={employeeData.email} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Phone:</label>
              <input type="text" className='form-control' name="phone" value={employeeData.phone} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Joining Date:</label>
              <input type="date" className='form-control' name="joining_date" value={employeeData.joining_date} onChange={handleOnChange}/>
            </Col>
            <Col sm={12} className="mb-3">
              <label className='mb-1'>Address:</label>
              <textarea type="text" className='form-control' style={{height:'65px'}} name="address" value={employeeData.address} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Salary:</label>
              <input type="text" className='form-control' name="salary" value={employeeData.salary} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Password:</label>
              <input type="text" className='form-control' name="password" value={employeeData.password} onChange={handleOnChange}/>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={()=>setEmployeeData(initials)}> Cancel </Button>
          <Button variant="secondary" onClick={handleAddModalClose}> Close </Button>
          <Button variant="primary" onClick={handleButtonSubmit}> Save </Button>
        </Modal.Footer>
      </Modal>
      
    </Container>
  )
}

export default Employee