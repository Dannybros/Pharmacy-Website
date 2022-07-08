import React from 'react'
import {Button, Row, Col, Modal, Form} from 'react-bootstrap'

function EmployeeForm({addModal, handleModalClose, handleButtonSubmit, handleOnChange, employeeData}) {
  return (
    <Modal 
        show={addModal} 
        onHide={handleModalClose} 
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
              <input type="text" className='form-control' name="EmployeeName" value={employeeData.EmployeeName} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Gender:</label>
              <Form.Select name="Gender" value={employeeData.Gender} onChange={handleOnChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Birthday:</label>
              <input type="date" className='form-control' name="BOD" value={employeeData.BOD} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Phone:</label>
              <input type="text" className='form-control' name="Phone" value={employeeData.Phone} onChange={handleOnChange}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Joining Date:</label>
              <input type="date" className='form-control' name="Joining_Date" value={employeeData.Joining_Date} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Salary:</label>
              <input type="text" className='form-control' name="Salary" value={employeeData.Salary} onChange={handleOnChange} 
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Password:</label>
              <input type="text" className='form-control' name="Password" value={employeeData.Password} onChange={handleOnChange}/>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}> Close </Button>
          <Button variant="primary" onClick={handleButtonSubmit}> Save </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default EmployeeForm