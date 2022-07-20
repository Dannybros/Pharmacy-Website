import React from 'react'
import {Button, Row, Col, Modal} from 'react-bootstrap'

function CustomerDetail({addModal, handleModalClose, selectedCustomer}) {
  return (
    <Modal 
        show={addModal} 
        onHide={handleModalClose} 
        animation={false} 
        size="lg" 
      >
        <Modal.Header>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>First Name:</label>
              <input type="text" className='form-control' value={selectedCustomer?.firstName} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Last Name:</label>
              <input type="text" className='form-control' value={selectedCustomer?.lastName} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Birthday:</label>
              <input type="date" className='form-control' value={selectedCustomer?.birthday} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Birthday:</label>
              <input type="date" className='form-control' value={selectedCustomer?.email} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Username:</label>
              <input type="date" className='form-control' value={selectedCustomer?.username} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Hint:</label>
              <input type="text" className='form-control' value={selectedCustomer?.hint} disabled/>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}> Close </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default CustomerDetail