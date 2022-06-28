import React, {useState} from 'react'
import './Products.scss'
import {Card, Button, Row, Col, Modal} from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

function Products() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleShow = (item) =>{
    setShowModal(true);
    setSelectedItem(item);
  };

  return (
    <div className='product'>
      <Card body>
        <section className="card-header">
          <div className='d-flex align-items-center'>
            <FormatListBulletedIcon className='list_icon'/> &nbsp; Product List
          </div>
          <div className='d-flex align-items-center'>
            <Button className='add_icon' variant="success" name="add" onClick={()=>handleShow(null)}><AddIcon/></Button>
          </div>
        </section>
        <main className='card-main'>
          <Row className="card-table-header">
            <Col xs={3} className="card-table-cell">  Image</Col>
            <Col xs={4} className="card-table-cell"> Product Name </Col>
            <Col xs={2} className="card-table-cell"> Price </Col>
            <Col xs={3} className="card-table-cell"> Action </Col>
          </Row>
          <Row>
            <Col xs={3} className="card-table-cell"> Product Image</Col>
            <Col xs={4} className="card-table-cell"> Product Name </Col>
            <Col xs={2} className="card-table-cell"> Price </Col>
            <Col xs={3} className="card-table-cell"> 
              <Button className='card_table_icon' variant='primary' name="update" onClick={()=>handleShow("ds")}><CreateIcon/></Button>
              &nbsp; &nbsp;
              <Button className='card_table_icon' variant='danger'><DeleteIcon/></Button>
            </Col>
          </Row>
        </main>
      </Card>

      <Modal show={showModal} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Name:</label>
              <input type="text" className='form-control'/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Type:</label>
              <input type="text" className='form-control'/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Brand:</label>
              <input type="text" className='form-control'/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Size:</label>
              <input type="text" className='form-control'/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product price:</label>
              <input type="text" className='form-control'/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Amount:</label>
              <input type="text" className='form-control'/>
            </Col>
            <Col sm={12} className="mb-3">
              <label className='mb-1'>Product Description:</label>
              <textarea type="text" className='form-control' style={{height:'100px'}}/>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary"> Update </Button> 
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Products