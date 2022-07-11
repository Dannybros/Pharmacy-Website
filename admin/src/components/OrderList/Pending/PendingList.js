import React, {useState} from 'react'
import '../OrderList.scss'
import Moment from 'react-moment'
import {Modal, Row, Col} from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import OrderTable from '../OrderTable';
import { Paper} from '@mui/material'

function PendingList() {

  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState(null);

  const handleOnSearch=(e)=>{
    setSearch(e.target.value);
  }

  const test = [{name:"dloimo", date:"2022/06/23", check:false}, {name:"gasdfasdf", date:"2022/06/23", check:true}, {name:"f23232", date:"2022/06/24", check:true}];
  
  return (
    <section className='orderList'>
      <Paper className='search_order' variant='outlined'>
        <main>
          <input type="text" placeholder='Search...' className='form-control' onChange={handleOnSearch}/>
          <SearchIcon className='search_icon'/>
        </main>
        <div style={{userSelect:"none"}}>
          Today: &nbsp;
          <b><Moment date={new Date()} format="YYYY/MM/DD"/></b>
        </div>
      </Paper>

      <OrderTable data={test} search={search} setShowDetail={setShowDetail}/>

      <Modal show={showDetail} fullscreen={true} onHide={() => setShowDetail(false)}>
        <Modal.Header className='modal_header' closeButton>
          <Modal.Title>Order ID : <b>adsfadsfadfasd</b></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal_body'>
          <div className="customer_info">
            <Row>
              <Col lg={4} xs={6} className="pb-4"> Customer ID: &nbsp; <b>THdau Sjsoips</b></Col>
              <Col lg={4} xs={6} className="pb-4"> Customer Name: &nbsp; <b>THdau Sjsoips</b></Col>
              <Col lg={4} xs={6} className="pb-4"> Customer Phone: &nbsp; <b>THdau Sjsoips</b></Col>
              <Col lg={6} xs={12} className="pb-4"> Customer Address: &nbsp; 3239-4843-33 </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default PendingList