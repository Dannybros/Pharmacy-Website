import React, {useState} from 'react'
import './Employee.scss'
import Modal from 'react-bootstrap/Modal';
import {Container, Button} from 'react-bootstrap'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Employee() {

  const [addModal, setAddModal] = useState(false);

  const handleAddModalClose = () => setAddModal(false);
  const handleAddModalShow = () => setAddModal(true);

  return (
    <Container className='employee_page'>
      <div className="staffNav p-3 d-flex justify-content-between">
          <button className="btn btn-primary py-2" onClick={handleAddModalShow}>Add New Employee</button>
          <form className="form-inline">
              <div className="input-group">
                  <input className="form-control ml-sm-2" type="search" placeholder="Search..."/>
                  <div className="input-group-prepend">
                      <span className="input-group-text">
                      <i className="fas fa-search">@</i>
                      </span>
                  </div>
              </div>
          </form>
      </div>
      <div className="staff_page mt-4 mb-2">
        <ul className="staff_table">
            <li className="d-flex justify-content-between staff_table_header" style={{height:'60px', borderBottom:'1px solid grey'}}>
                <span className="col-2 staff_list"><b>ID</b></span>
                <span className="col-2 staff_list"><b>Name</b></span>
                <span className="col-2 staff_list"><b>Phone</b></span>
                <span className="col-2 staff_list"><b>Salary</b></span>
                <span className="col-2 staff_list"><b>Password</b></span>
                <span className="col-2 staff_list"><b>Action</b></span>
            </li>
            <div className="staff_list_display">
              <li className="d-flex justify-content-between">
                  <span className="col-2 staff_list"> adfa</span>
                  <span className="col-2 staff_list" style={{textTransform:"capitalize"}}> adfa </span>
                  <span className="col-2 staff_list"> adfa </span>
                  <span className="col-2 staff_list"> adfa </span>
                  <span className="col-2 staff_list"> adfa </span>
                  <span className="col-2 staff_list justify-content-around">
                    <Button variant="primary" className='btn_view'> <ModeEditIcon className='edit_icon'/></Button> 
                    <Button variant="success" className='btn_view'> <RemoveRedEyeIcon className='edit_icon'/></Button> 
                    <Button variant="danger" className='btn_view'> <DeleteIcon className='edit_icon'/></Button> 
                  </span>
              </li>
              <li className="d-flex justify-content-between">
                  <span className="col-2 staff_list"> adfa</span>
                  <span className="col-2 staff_list" style={{textTransform:"capitalize"}}> adfa </span>
                  <span className="col-2 staff_list"> adfa </span>
                  <span className="col-2 staff_list"> adfa </span>
                  <span className="col-2 staff_list"> adfa </span>
                  <span className="col-2 staff_list justify-content-around">
                    <Button variant="primary" className='btn_view'> <ModeEditIcon className='edit_icon'/></Button> 
                    <Button variant="success" className='btn_view'> <RemoveRedEyeIcon className='edit_icon'/></Button> 
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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    </Container>
  )
}

export default Employee