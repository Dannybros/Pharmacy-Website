import React, {useState} from 'react'
import {Card, Button, Row, Col, Modal} from 'react-bootstrap'
import './Categories.scss'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [category, setCategory] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setCategory("");
    setSelectedItem(null);
  };

  const handleShow = (item) =>{
    setShowModal(true);
    setSelectedItem(item);
    item!==null && setCategory(item);
  };

  const handleBtnSubmit=()=>{
    console.log(selectedItem!==null ? 'update' : 'add');
  }

  return (
    <div className='category'>
      <Card body>
        <section className="card-header">
          <div className='d-flex align-items-center'>
            <FormatListBulletedIcon className='list_icon'/> &nbsp; Categories
          </div>
          <div className='d-flex align-items-center'>
            <Button className='add_icon' variant="success" name="add" onClick={()=>handleShow(null)}><AddIcon/></Button>
          </div>
        </section>
        <main className='card-main'>
          <Row className="card-table-header">
            <Col xs={7} className="card-table-cell"> Categories <KeyboardArrowDownIcon/> </Col>
            <Col xs={5} className="card-table-cell"> Action </Col>
          </Row>
          <Row>
            <Col xs={7} className="card-table-cell"> Categories </Col>
            <Col xs={5} className="card-table-cell"> 
              <Button className='card_table_icon' variant='primary' name="update" onClick={()=>handleShow("ds")}><CreateIcon/></Button>
              &nbsp; &nbsp;
              <Button className='card_table_icon' variant='danger'><DeleteIcon/></Button>
            </Col>
          </Row>
        </main>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className='form-control' value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Category Name...'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBtnSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Categories