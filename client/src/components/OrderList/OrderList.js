import React, {useState, useEffect} from 'react'
import './OrderList.scss'
import {Button, Modal, Container, Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useLocalStorage } from '../../Reducer/useLocalStorage';
import OrderTable from './OrderTable';
import axios from '../axios/axios'
//import io from 'socket.io-client';
import moment from 'moment'

function OrderList() {

  const navigate = useNavigate();
  const [user] = useLocalStorage('User');
  const [socket, setSocket] = useState();
  const [orders, setOrders] = useState([]);
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
          <OrderTable data={filterData(orders)}/>

        </div> :
        <div className='non_user_page'>
          <h1 className='text-uppercase'>Please Log In To Access Order List Page...</h1>
          <Button onClick={()=>navigate('/user')}>Go TO LOGIN PAGE</Button>
        </div>
      }
      <Modal
        show={viewDetail}
        onHide={() => setViewDetail(false)}
        dialogClassName="modal_view"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
          <Container>
            <Row>
              <Col xs={12} md={8}>
                .col-xs-12 .col-md-8
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setViewDetail(false)}>Close</Button>
        </Modal.Footer>

      </Modal>

    </div>
  )
}

export default OrderList