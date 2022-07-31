import React, {useState, useEffect} from 'react'
import './OrderList.scss'
import { useParams } from 'react-router-dom';
import {Alert, Snackbar, Paper, Typography} from '@mui/material'
import Moment from 'react-moment'
import SearchIcon from '@mui/icons-material/Search';
import OrderTable from './OrderCompo/OrderTable';
import OrderDetail from './OrderCompo/OrderDetail';
import axios from '../axios'
import Swal from 'sweetalert2'
import { useStateValue } from '../../context/StateProvider';

function OrderList() {

  const {status} = useParams();
  const [{socket}] = useStateValue();

  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showAlert, setShowAlert] = useState({state:false, msg:""});

  useEffect(() => {
    const fetchOrders= async()=>{
      await axios.get(`/order/${status}`)
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

    fetchOrders();
  }, [status])

  useEffect(() => {
    
    socket.on("update_order", (data)=>{
      const updatedItem = data.data;
      setOrders(oldItems=>{
        return oldItems.map(order => {
          return order._id === updatedItem._id ? { ...updatedItem} : order
        })
      })
    })

    socket.on('order_start_end', async(data)=>{
       const updatedItem = data.data;

       await setShowDetail(false);

       setOrders((items)=>{return items.filter((item)=>item._id!==updatedItem._id)});

       setShowAlert({state:true, msg:data.message})
    })

  }, [socket])

  const handleOnSearch=(e)=>{
    setSearch(e.target.value);
  }

  const handleShowDetails=async(item)=>{
    await setSelectedOrder(item);
    setShowDetail(true);

    if(!item.checked){
      axios.post('/order/checked', {_id:item._id})
     .then(res=>res)
     .catch(err=>alert(err.response))
   }
  }

  const handleCloseDetails=()=>{
    setShowDetail(false);
    setSelectedOrder(null);
  }

  const handleSubmit=(id, customerID, name)=>{
    status==="pending"? startDelivery(id, customerID, name) : completeOrder(id, customerID)
  }

  const handleCancel = (data)=>{
    axios.post('/order/cancelled', {order:data})
    .catch((error)=>{
      Swal.fire({
        title: 'error',
        text: error.response.data.message,
        icon: 'warning',
      })
    })
  }

  const startDelivery=(id, customerID, name)=>{
    if(name===""){
      alert("Please Fill in the Employee")
    }else{
      axios.post('/order/start_delivery', {_id:id, customerID:customerID, empName:name})
      .catch((error)=>{
        Swal.fire({
          title: 'error',
          text: error.response.data.message,
          icon: 'warning',
        })
      })
    }
  }

  const completeOrder=(id, customerID)=>{
    axios.post('/order/complete_order', {_id:id, customerID:customerID})
    .catch((error)=>{
      Swal.fire({
        title: 'error', 
        text: error.response.data.message,
        icon: 'warning',
      })
    })
  }

  const handelCloseAlert=()=>{
    setShowAlert({state:false, message:""})
  }

  return (
    <section className='orderList'>

      <Snackbar open={showAlert.state} severity="success" autoHideDuration={5000} onClose={handelCloseAlert} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={handelCloseAlert} variant="filled" severity="success" sx={{ width: '100%' }}>
          {showAlert.msg}
        </Alert>
      </Snackbar>

      <Paper variant='outlined'>
        <Typography sx={{mt:1, p:3}} style={{ fontWeight: 600 }} variant="h4" component="h4"> {status==="delivery"? "Deliveries" : "New Orders"} </Typography>
      </Paper>

      <Paper className='search_order' variant='outlined'>
        <main>
          <input type="text" placeholder='Search...' className='form-control' onChange={handleOnSearch}/>
          <SearchIcon className='search_icon'/>
        </main>
        <div style={{userSelect:"none"}}>
          Today: &nbsp;
          <b><Moment date={new Date()} format="YYYY/MM/DD"/></b>
        </div>
      </Paper>

      <OrderTable data={orders} search={search} handleShowDetails={handleShowDetails}/>

      <OrderDetail data={selectedOrder} showDetail={showDetail} handleCancel={handleCancel} handleCloseDetails={handleCloseDetails} handleSubmit={handleSubmit}/>
    </section>
  )
}

export default OrderList