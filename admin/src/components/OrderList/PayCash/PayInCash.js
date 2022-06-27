import React, {useState} from 'react'
import '../OrderList.scss'
import {Button} from 'react-bootstrap'
import Moment from 'react-moment'
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DangerousIcon from '@mui/icons-material/Dangerous';

function PayInCash() {

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
          <div>Total</div>
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
                <div>Total</div>
                <div>
                  <Button variant='danger' className='p-1'>
                    <DangerousIcon/>
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
    </section>
  )
}

export default PayInCash