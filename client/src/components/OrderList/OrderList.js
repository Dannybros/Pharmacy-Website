import React, {useState, useEffect} from 'react'
import './OrderList.scss'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useLocalStorage } from '../../Reducer/useLocalStorage';
import {Tabs, Tab, Box, Divider} from '@mui/material'
import axios from '../axios/axios'
import io from 'socket.io-client';
import moment from 'moment'
import OrderTable from './orderCompo/OrderTable';
import OrderDetail from './orderCompo/OrderDetail';

function OrderList() {

  const navigate = useNavigate();
  const [user] = useLocalStorage('User');
  const [socket, setSocket] = useState();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState({search:"", date:"", status:"All"});
  const [viewDetail, setViewDetail] = useState(false);

  useEffect(() => {
    const fetchProducts= async()=>{
      await axios.post('/order/user', {_id:user._id})
      .then(res=>{
        setOrders(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchProducts();
  }, [user])
  
  // useEffect(() => {
  //   const s = io.connect("http://localhost:5000");
  //   setSocket(s);
  
  //   return () => {
  //     s.disconnect();
  //   }
  // }, [])
  
  // useEffect(() => {
  //   if (socket==null) return

  //   socket.on("order_start_end", (data)=>{
  //     const updatedItem = data.data;
  //     setOrders(oldItems=>{
  //       return oldItems.map(item => {
  //         return item._id === updatedItem._id ? { ...updatedItem} : item
  //       })
  //     })
  //   })

  // }, [socket])  

  const handleSearchChange=(e)=>{
    setOrderFilter({...orderFilter, search:e.target.value});
  }
  
  const handleDateChange=(e)=>{
    setOrderFilter({...orderFilter, date:e.target.value});
  }
  
  const handleChangeTab = (event, newValue) => {
    setOrderFilter({...orderFilter, status:newValue});
  };

  const filterData=(data, status)=>{
    if(!orderFilter.search && !orderFilter.date) return data;

    const searchTerm = orderFilter.search.toLowerCase();

    const searchDate = orderFilter.date===""? "" : moment(orderFilter.date).format("YYYY-MM-DD")

    const searchStatus = status==="All"? "" : status;
    
    const filterData = data.filter((item)=>{
      console.log(item.status);
      return item._id.includes(searchTerm) && item.createdAt.includes(searchDate) && item.status.includes(searchStatus)
    })

    return filterData
  }

  const openDetailModal=async(item)=>{
    await setSelectedOrder(item)
    setViewDetail(true)
  }

  return (
    <div className='orderList'>
      {Object.keys(user).length !== 0?
        <div className='pb-4'>
          <section className='order_search_section'>
            <h1>Order List</h1>
            <div className='d-flex'>
              <input type="text" className='form-control' placeholder='Search...' value={orderFilter.search} onChange={handleSearchChange}/>
              <input type="date" className='form-control' value={orderFilter.date} onChange={handleDateChange}/>
            </div>
          </section>
          <Divider/>

          <Box sx={{ width: '100%' }}>
            <Tabs
              value={orderFilter.status}
              onChange={handleChangeTab}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="All" label="All" />
              <Tab value="Pending" label="Pending" />
              <Tab value="On Delivery" label="Delivery" />
              <Tab value="Completed" label="Completed" />
              <Tab value="Cancelled" label="Cancelled" />
            </Tabs>
          </Box>
          <Divider/>

          <OrderTable data={filterData(orders)} openDetailModal={openDetailModal}/>
          
          <OrderDetail viewDetail={viewDetail} setViewDetail={setViewDetail} data={selectedOrder}/>

        </div> :
        <div className='non_user_page'>
          <h1 className='text-uppercase'>Please Log In To Access Order List Page...</h1>
          <Button onClick={()=>navigate('/user')}>Go TO LOGIN PAGE</Button>
        </div>
      }
      

    </div>
  )
}

export default OrderList