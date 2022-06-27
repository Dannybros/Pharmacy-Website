import React from 'react'
import {Card, Button, Row, Col} from 'react-bootstrap'
import './Categories.scss'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Categories() {
  return (
    <div className='category'>
      <Card body>
        <section className="card-header">
          <div className='d-flex align-items-center'>
            <FormatListBulletedIcon className='list_icon'/> &nbsp; Categories
          </div>
          <div className='d-flex align-items-center'>
            <Button className='p-1' variant="success"><AddIcon/></Button>
          </div>
        </section>
        <main className='card-main'>
          <Row className="card-table-header">
            <Col md={8} className="card-table-cell"> Categories <KeyboardArrowDownIcon/> </Col>
            <Col md={4} className="card-table-cell"> Action </Col>
          </Row>
          <Row>
            <Col md={8} className="card-table-cell"> Categories </Col>
            <Col md={4} className="card-table-cell"> 
              <Button className='card_table_icon' variant='primary'><CreateIcon/></Button>
              &nbsp; &nbsp;
              <Button className='card_table_icon' variant='danger'><DeleteIcon/></Button>
            </Col>
          </Row>
        </main>
      </Card>
    </div>
  )
}

export default Categories