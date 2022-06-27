import React from 'react'
import './OrderReport.scss'
import {Accordion, Button} from 'react-bootstrap'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';

function OrderReport() {

  const test = [{name:"d", date:"2022/06/23"}, {name:"g", date:"2022/06/23"}, {name:"f", date:"2022/06/24"}];
  
  const groupByCategory = test.reduce((group, product) => {
    const { date } = product;
    group[date] = group[date] ?? [];
    group[date].push(product);
    return group;
  }, {});

  return (
    <div className='order_report'>
       <div className='search_order'>
        <main>
          <input type="text" placeholder='Search...' className='form-control'/>
          <SearchIcon className='search_icon'/>
        </main>
      </div>
      <li className='table_header'>
        <div>Order ID</div>
        <div>Customer</div>
        <div>Order Time</div>
        <div>Paid</div>
        <div>Delivery</div>
        <div>Action</div>
      </li>
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
                          <Button variant='primary' disabled> <CheckIcon/> </Button>
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
    </div>
  )
}

export default OrderReport