import React from 'react'
import './OrderList.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckIcon from '@mui/icons-material/Check';
import {Button} from 'react-bootstrap'
import { useLocalStorage } from '../../Reducer/useLocalStorage';
import Pagination from './Pagination';

function OrderList() {

  const [items] = useLocalStorage('Items');

  function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const newItems = groupArrayOfObjects(items,"category");
  const dates = Object.keys(newItems);
  
  const getItemsInSameCat=(date)=>{
    let tempItems = newItems[date];
    return tempItems;
  }

  const TestPopper = (props)=>{
    return(
      <li className='order_table_list'>
        <main className='order__info'>
          <div>Name</div>
          <div>Email</div>
          <div>Bill ID</div>
          <div>Bill Total</div>
          <div>Bill Date</div>
          <div>Status</div>
        </main>

        <div className='order_button_list'>
          <Button variant='success'> <RemoveRedEyeIcon className="order_btn_icon"/> </Button>
          {/* <Button variant='primary' disabled> <CheckIcon className="order_btn_icon"/> </Button> */}
          <Button variant='warning' disabled> <HourglassBottomIcon className="order_btn_icon"/> </Button>
        </div>
      </li>
    )
  }

  return (
    <div className='orderList'>
      <section className='order_search_section'>
        <h1>Order List</h1>
        <div className='d-flex'>
          <input type="text" className='form-control' placeholder='Search...'/>
          <input type="date" className='form-control' />
        </div>
      </section>

      <section className='order_list_container'>
        <ul className='order_header_title'>
          <li className='order_table_list bold_header'>
            <main className='order__info'>
              <div>Name</div>
              <div>Email</div>
              <div>Bill ID</div>
              <div>Bill Total</div>
              <div>Bill Date</div>
              <div>Status</div>
            </main>
            <div className='action_box'>Action</div>
          </li>
        </ul>
        <TestPopper/>
        {dates.map((date, i)=>{
          return(
            <article key={i}>
              <div className='date_teller'>
                <span>{date}</span>
                <KeyboardArrowDownIcon />
              </div>
              <ul>
                {getItemsInSameCat(date).map(item=>{
                  return(
                    <li className='order_table_list' key={item.title}>
                      <main className='order__info'>
                        <div>Name</div>
                        <div>Email</div>
                        <div>Bill ID</div>
                        <div>Bill Total</div>
                        <div>Bill Date</div>
                        <div>Status</div>
                      </main>
        
                      <div className='order_button_list'>
                        <Button variant='success'> <RemoveRedEyeIcon className="order_btn_icon"/> </Button>
                        <Button variant='primary' disabled> <CheckIcon className="order_btn_icon"/> </Button>
                        <Button variant='warning' disabled> <HourglassBottomIcon className="order_btn_icon"/> </Button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </article>
          )
        })}
      <Pagination
          data={items}
          renderComp={TestPopper}
          dataLimit={6}
      />
      </section>

    </div>
  )
}

export default OrderList