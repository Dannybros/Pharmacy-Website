import React, {useState, useEffect} from 'react'
import './OrderList.scss'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Tabs, Tab, Box, Divider} from '@mui/material'
import axios from '../axios/axios'
import moment from 'moment'
import OrderTable from './orderCompo/OrderTable';
import OrderDetail from './orderCompo/OrderDetail';
import { useStateValue } from '../../Reducer/StateProvider';
import { useTranslation } from 'react-i18next'

function OrderList() {

  const navigate = useNavigate();
  const {t} = useTranslation();
  const [{user, socket, lang}] = useStateValue();
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
  
  useEffect(() => {
    socket.on("order_update", (data)=>{
      const updatedItem = data.data;
      setOrders(oldItems=>{
        return oldItems.map(item => {
          return item._id === updatedItem._id ? { ...updatedItem} : item
        })
      })
    })

  }, [socket])  

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
    if(!orderFilter.search && !orderFilter.date && status==="All") return data;

    const searchTerm = orderFilter.search.toLowerCase();

    const searchDate = orderFilter.date===""? "" : moment(orderFilter.date).format("YYYY-MM-DD")

    const searchStatus = status==="All"? "" : status.toLowerCase()
    
    const filterData = data.filter((item)=>{
      return item.status.en.toLowerCase().includes(searchStatus) && item._id.includes(searchTerm) && item.createdAt.includes(searchDate)
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
            <h1>
              {t('OrderList.heading')}
            </h1>
            <div className='d-flex'>
              <input type="text" className='form-control' placeholder={t('OrderList.search')} value={orderFilter.search} onChange={handleSearchChange}/>
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
              <Tab label={t('OrderList.tab.header1')} value="All" />
              <Tab label={t('OrderList.tab.header2')}  value="Pending"/>
              <Tab label={t('OrderList.tab.header3')} value="Delivery"/>
              <Tab label={t('OrderList.tab.header4')} value="Completed"/>
              <Tab label={t('OrderList.tab.header5')} value="Cancelled"/>
            </Tabs>
          </Box>
          <Divider/>
          
          <OrderTable data={filterData(orders, orderFilter.status)} openDetailModal={openDetailModal}/>

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