import React, {useState, useEffect} from 'react'
import './OrderList.scss'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useLocalStorage } from '../../Reducer/useLocalStorage';
import axios from '../axios/axios'
//import io from 'socket.io-client';
import moment from 'moment'
import OrderTable from './orderCompo/OrderTable';
import OrderDetail from './orderCompo/OrderDetail';

function OrderList() {

  const navigate = useNavigate();
  const [user] = useLocalStorage('User');
  const [socket, setSocket] = useState();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [viewDetail, setViewDetail] = useState(false);

  useEffect(() => {
    const fetchProducts= async()=>{
      await axios.get('/order')
      .then(res=>{
        setOrders(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchProducts();
  }, [])
  
  // useEffect(() => {
  //   const s = io.connect("http://localhost:5000");
  //   setSocket(s);
  
  //   return () => {
  //     s.disconnect();
  //   }
  // }, [])
  
  // useEffect(() => {
  //   if (socket==null) return
    
  //   socket.on("update_order", (data)=>{
  //     setOrders(oldArray => [...oldArray, data.data]);
  //   })

  // }, [socket])  

  const handleSearchChange=(e)=>{
    setOrderSearch(e.target.value);
  }
  
  const handleDateChange=(e)=>{
    setOrderDate(e.target.value);
  }

  const filterData=(data)=>{
    if(!orderSearch && !orderDate) return data;

    const searchTerm = orderSearch.toLowerCase();

    const filterData = data.filter((item)=>{
      const dateTime = moment.utc(orderDate).format("YYYY-MM-DD");
      console.log(dateTime);
      return item.paymentMethod.includes(searchTerm) && item.createdAt.includes(dateTime)
    })

    return filterData
  }

  const openDetailModal=(item)=>{
    setSelectedOrder(item.orderItems)
    setViewDetail(true)
  }

  return (
    <div className='orderList'>
      {user?
        <div className='pb-4'>
          <section className='order_search_section'>
            <h1>Order List</h1>
            <div className='d-flex'>
              <input type="text" className='form-control' placeholder='Search...' value={orderSearch} onChange={handleSearchChange}/>
              <input type="date" className='form-control' value={orderDate} onChange={handleDateChange}/>
            </div>
          </section>
          <OrderTable data={filterData(orders)} openDetailModal={openDetailModal}/>

        </div> :
        <div className='non_user_page'>
          <h1 className='text-uppercase'>Please Log In To Access Order List Page...</h1>
          <Button onClick={()=>navigate('/user')}>Go TO LOGIN PAGE</Button>
        </div>
      }
      
      <OrderDetail viewDetail={viewDetail} setViewDetail={setViewDetail} data={selectedOrder}/>

    </div>
  )
}

export default OrderList