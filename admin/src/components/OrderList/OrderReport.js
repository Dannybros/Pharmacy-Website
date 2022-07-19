import React, {useState, useEffect} from 'react'
import './OrderList.scss'
import {Tabs, Tab, Paper, Divider} from '@mui/material'
import moment from 'moment'
import OrderTable from './OrderCompo/OrderTable';
import OrderDetail from './OrderCompo/OrderDetail';
import Swal from 'sweetalert2'
import axios from '../axios'

function OrderReport() {

    const [orders, setOrders] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderFilter, setOrderFilter] = useState({search:"", date:"", status:"All"});

    useEffect(() => {
        const fetchProducts= async()=>{
          await axios.get(`/order`)
          .then(res=>{
            setOrders(res.data)
          })
          .catch((error)=>{
            Swal.fire({
              title: 'error',
              text: error.response.data.message,
              icon: 'warning',
            })
          })
        }
    
        fetchProducts();
    }, [])

    const handleSearchChange=(e)=>{
        setOrderFilter({...orderFilter, search:e.target.value});
    }
    
    const handleDateChange=(e)=>{
        setOrderFilter({...orderFilter, date:e.target.value});
    }
    
    const handleChangeTab = (event, newValue) => {
        setOrderFilter({...orderFilter, status:newValue});
    };

    const handleShowDetails=(item)=>{
        setSelectedOrder(item);
        setShowDetail(true);
    }

    const handleCloseDetails=()=>{
        setShowDetail(false);
        setSelectedOrder(null);
      }

    const filterData=(data, status)=>{
        if(!orderFilter.search && !orderFilter.date && status==="All") return data;

        const searchTerm = orderFilter.search.toLowerCase();

        const searchDate = orderFilter.date===""? "" : moment(orderFilter.date).format("YYYY-MM-DD")

        const searchStatus = status==="All"? "" : status.toLowerCase()
        
        const filterData = data.filter((item)=>{
            return item.status.toLowerCase().includes(searchStatus) && item._id.includes(searchTerm) && item.createdAt.includes(searchDate)
        })

        return filterData
    }

    const openDetailModal=async(item)=>{
        await setSelectedOrder(item)
        setShowDetail(true)
    }
    

    return (
        <div className='orderList'>
            <div className='pb-4'>
                <section className='search_order'>
                    <h1>Order List</h1>
                    <div className='d-flex'>
                        <input type="text" className='form-control' placeholder='Search...' value={orderFilter.search} onChange={handleSearchChange}/>
                        <input type="date" className='form-control' value={orderFilter.date} onChange={handleDateChange}/>
                    </div>
                </section>
                <Divider/>
    
                <Paper variant='outlined' sx={{ width: '100%', bgcolor:"white", py:1 }}>
                    <Tabs
                        value={orderFilter.status}
                        onChange={handleChangeTab}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab label="All" value="All" />
                        <Tab label="Pending"  value="Pending"/>
                        <Tab label="Delivery" value="Delivery"/>
                        <Tab label="Completed" value="Completed"/>
                        <Tab label="Cancelled" value="Cancelled"/>
                    </Tabs>
                </Paper>
                <Divider/>
                
                <OrderTable data={filterData(orders, orderFilter.status)} handleShowDetails={handleShowDetails}/>
    
                <OrderDetail showDetail={showDetail} handleCloseDetails={handleCloseDetails}  data={selectedOrder} report={true}/>
            </div>
        </div>
    )
}

export default OrderReport