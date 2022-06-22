import React, {useState} from 'react'
import './OrderList.scss';
import {Container, Modal, Button} from 'react-bootstrap'

function OrderList() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleActiveTab=(e)=>{
    setActiveTab(e.target.getAttribute('name'))
  }

  return (
    <Container className='orderList'>
      <div className='toggle-tab'>
        <li onClick={handleActiveTab} name="tab1" className={activeTab === 'tab1'? "active" : ""}>
          New Orders
        </li>
        <li onClick={handleActiveTab} name="tab2" className={activeTab === 'tab2'? "active" : ""}> 
          Delivered
        </li>
      </div>
      <ul className='order_header_title'>
        <li className='order_table_list'>
          <main className='order__info'>
            <div>Order ID</div>
            <div>Order Total</div>
            <div>Order Time</div>
            <div>Paid</div>
            <div>Delivery</div>
            <div>Action</div>
          </main>
        </li>
        <li className='order_table_list'>
          <main className='order__info'>
            <div>Order ID</div>
            <div>Order Total</div>
            <div>Order Time</div>
            <div>Paid</div>
            <div>Delivery</div>
            <div>Action</div>
          </main>
        </li>
      </ul>
    </Container>
  )
}

export default OrderList