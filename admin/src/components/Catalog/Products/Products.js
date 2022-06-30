import React, {useState} from 'react'
import './Products.scss'
import {Card, Button, Row, Col, Modal} from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

function Products() {

  const initialProductInfo = {name:"", type:"", price:"", brand:"", weight:"", amount:"", description:"", expire:""};

  const [showModal, setShowModal] = useState(false);
  const [productInfo, setProductInfo] = useState(initialProductInfo);
  const [selectedItem, setSelectedItem] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(false);
    setProductInfo(initialProductInfo);
  };

  const handleShow = (item) =>{
    setShowModal(true);
    setSelectedItem(item===null? false : true);
    setProductInfo(item!==null?item : initialProductInfo);
  };

  const handleOnChange =(e)=>{
    setProductInfo({...productInfo, [e.target.name]: e.target.value});
  }

  const handleBtnSubmit=()=>{
    console.log(selectedItem? "update": "add");
  }

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
            <Col xs={3} className="card-table-cell"> Image</Col>
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
              <input type="text" className='form-control' name='name' value={productInfo.name} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Type:</label>
              <input type="text" className='form-control' name='type' value={productInfo.type} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Brand:</label>
              <input type="text" className='form-control' name='brand' value={productInfo.brand} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Size:</label>
              <input type="text" className='form-control' name='weight' value={productInfo.weight} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product price:</label>
              <input type="text" className='form-control' name='price' value={productInfo.price} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Amount:</label>
              <input type="text" className='form-control' name='amount' value={productInfo.amount} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Expiration:</label>
              <input type="date" className='form-control'  name='expire' value={productInfo.expire} onChange={handleOnChange}/>
            </Col>
            <Col sm={12} className="mb-3">
              <label className='mb-1'>Product Description:</label>
              <textarea type="text" className='form-control' style={{height:'100px'}} name='description' value={productInfo.description} onChange={handleOnChange}/>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={handleBtnSubmit}> Save </Button> 
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Products