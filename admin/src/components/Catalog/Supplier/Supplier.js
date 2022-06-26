import React, {useState} from 'react'
import './Supplier.scss'
import {Container, Modal, Button} from 'react-bootstrap'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

function Supplier() {
  
  const [addModal, setAddModal] = useState(false);

  const handleAddModalClose = () => setAddModal(false);
  const handleAddModalShow = () => setAddModal(true);


  return (
    <Container className="supplier">
      <div className="search_box p-3 d-flex justify-content-between">
          <Button className="py-2" variant="primary" onClick={handleAddModalShow}>Add New Supplier</Button>
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

      <div className="supplier_page">
        <ul className="supplier_table">
            <li className="d-flex justify-content-between supplier_table_header">
                <span className="supplier_list"><b>ID</b></span>
                <span className="supplier_list"><b>Name</b></span>
                <span className="supplier_list"><b>Phone</b></span>
                <span className="supplier_list"><b>Email</b></span>
                <span className="supplier_list"><b>Action</b></span>
            </li>
            <div className="supplier_list_display">
              <li className="d-flex justify-content-between">
                  <span className="supplier_list"> adfa</span>
                  <span className="supplier_list" style={{textTransform:"capitalize"}}> adfa </span>
                  <span className="supplier_list"> adfa </span>
                  <span className="supplier_list"> adfa </span>
                  <span className="supplier_list justify-content-around">
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

export default Supplier