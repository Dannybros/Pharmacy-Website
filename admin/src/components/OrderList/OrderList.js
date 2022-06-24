import React, {useState} from 'react'
import './OrderList.scss';
import {Container, Button, Accordion} from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckIcon from '@mui/icons-material/Check';


function OrderList() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  const handleActiveTab=(e)=>{
    setActiveTab(e.target.getAttribute('name'))
  }

  const test = [{name:"d", date:"2022/06/23"}, {name:"g", date:"2022/06/23"}, {name:"f", date:"2022/06/24"}];
  
  const groupByCategory = test.reduce((group, product) => {
    const { date } = product;
    group[date] = group[date] ?? [];
    group[date].push(product);
    return group;
  }, {});
  

  const NewOrdersTab = ()=>{
    return(
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
    )
  }

  const DeliveredOrdersTab=()=>{
    return(
      <>
        {Object.keys(groupByCategory).map((item, i)=>{
          return(
            <Accordion key={i} defaultActiveKey={i}>
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{item}</Accordion.Header>
                <Accordion.Body>
                {groupByCategory[item].map((order, i)=>{
                  return(
                    <li className='order_table_list' key={i}>
                      <main className='order__info'>
                        <div>Order ID</div>
                        <div>Order {order.name}</div>
                        <div>Order Time</div>
                        <div>
                          <Button variant='primary' disabled> <CheckIcon/> </Button>
                        </div>
                        <div>
                          <Button variant='warning' disabled> <HourglassBottomIcon/> </Button>
                        </div>
                        <div>
                          <Button variant='success'> <RemoveRedEyeIcon/> </Button>
                        </div>
                      </main>
                    </li>
                  )
                })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
      </>
    )
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

      <div className='search_order' style={{borderBottom: activeTab === 'tab1'? '1px solid gray' : 'none'}}>
        <input type="text" placeholder='Search...' className='form-control'/>
        <SearchIcon className='search_icon'/>
      </div>

      {activeTab==='tab1'?
        <ul className='order_header_title'>
        <NewOrdersTab/>
        </ul> :
        <DeliveredOrdersTab/>
      }

    </Container>
  )
}

export default OrderList