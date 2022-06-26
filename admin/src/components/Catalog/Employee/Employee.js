import React, {useState} from 'react'
import './Employee.scss'
import {Container, Button, Modal} from 'react-bootstrap'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

function Employee() {

  const [addModal, setAddModal] = useState(false);

  const handleAddModalClose = () => setAddModal(false);
  const handleAddModalShow = () => setAddModal(true);

  return (
    <Container className='employee'>
      <div className="staffNav p-3 d-flex justify-content-between">
          <Button className="py-2" variant='primary' onClick={handleAddModalShow}>Add New Employee</Button>
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
                <span className="staff_list"><b>ID</b></span>
                <span className="staff_list"><b>Name</b></span>
                <span className="staff_list"><b>Phone</b></span>
                <span className="staff_list"><b>Salary</b></span>
                <span className="staff_list"><b>Password</b></span>
                <span className="staff_list"><b>Action</b></span>
            </li>
            <div className="staff_list_display">
              <li className="d-flex justify-content-between">
                  <span className="staff_list"> adfa</span>
                  <span className="staff_list" style={{textTransform:"capitalize"}}> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list justify-content-around">
                    <Button variant="success" className='btn_view'> <RemoveRedEyeIcon className='edit_icon'/></Button> 
                    <Button variant="danger" className='btn_view'> <DeleteIcon className='edit_icon'/></Button> 
                  </span>
              </li>
              <li className="d-flex justify-content-between">
                  <span className="staff_list"> adfa</span>
                  <span className="staff_list" style={{textTransform:"capitalize"}}> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list"> adfa </span>
                  <span className="staff_list justify-content-around">
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