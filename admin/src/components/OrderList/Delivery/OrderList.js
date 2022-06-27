import React, {useState} from 'react'
import '../OrderList.scss'
import Moment from 'react-moment'
import {Button, Modal, Row, Col} from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckIcon from '@mui/icons-material/Check';
import logo from '../../../img/MedLogo.png';

function OrderList() {

  const [showDetail, setShowDetail] = useState(false);
  const test = [{name:"d", date:"2022/06/23"}, {name:"g", date:"2022/06/23"}, {name:"f", date:"2022/06/24"}];
  
  return (
    <section className='orderList'>
      <div className='search_order'>
        <main>
          <input type="text" placeholder='Search...' className='form-control'/>
          <SearchIcon className='search_icon'/>
        </main>
        <div>
          Today: &nbsp;
          <b><Moment date={new Date()} format="YYYY/MM/DD"/></b>
        </div>
      </div>

      <li className='order_header'>
        <main className='order__info'>
          <div>Order ID</div>
          <div>Customer</div>
          <div>Order Time</div>
          <div>Paid</div>
          <div>Delivery</div>
          <div>Action</div>
        </main>
      </li>
      {
        test.map((item, i)=>{
          return(
            <li className='order_table_list' key={i}>
              <main className='order__info'>
                <div>Order ID</div>
                <div>{item.name}</div>
                <div>{item.date}</div>
                <div>
                  <Button variant='primary' className='p-1'>
                    <CheckIcon/>
                  </Button>
                </div>
                <div>
                  <Button variant='warning' className='p-1'>
                    <HourglassBottomIcon className='waiting_icon'/>
                  </Button>
                </div>
                <div>
                  <Button variant='success' className='p-1' onClick={() => setShowDetail(true)}>
                    <RemoveRedEyeIcon/>
                  </Button>
                </div>
              </main>
            </li>
          )
        })
      }

      <Modal show={showDetail} fullscreen={true} onHide={() => setShowDetail(false)}>
        <Modal.Header className='modal_header' closeButton>
          <Modal.Title>Order ID : <b>adsfadsfadfasd</b></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal_body'>
          <div className="customer_info">
            <Row>
              <Col lg={4} xs={6} className="pb-4">
                Customer ID: &nbsp; <b>THdau Sjsoips</b>
              </Col>
              <Col lg={4} xs={6} className="pb-4">
                Customer Name: &nbsp; <b>THdau Sjsoips</b>
              </Col>
              <Col lg={4} xs={6} className="pb-4">
                Customer Phone: &nbsp; <b>THdau Sjsoips</b>
              </Col>
              <Col lg={6} xs={12} className="pb-4">
                Customer Address: &nbsp; 3239-4843-33
              </Col>
            </Row>
          </div>
          <li className='table_header'>
            <div>Image</div>
            <div>P-ID</div>
            <div>P-Name</div>
            <div>Amount</div>
            <div>Total</div>
          </li>
          <li>
            <div>
              <img src={logo} alt=""/>
            </div>
            <div>P-ID</div>
            <div>P-Name</div>
            <div>Amount</div>
            <div>Total</div>
          </li>
          <li>
            <div>
              <img src={logo} alt=""/>
            </div>
            <div>P-ID</div>
            <div>P-Name</div>
            <div>Amount</div>
            <div>Total</div>
          </li>
          <li>
            <div>
              <img src={logo} alt=""/>
            </div>
            <div>P-ID</div>
            <div>P-Name</div>
            <div>Amount</div>
            <div>Total</div>
          </li>
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default OrderList