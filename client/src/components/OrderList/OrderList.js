import React, {useState} from 'react'
import './OrderList.scss'
import {Button, Modal, Container, Row, Col} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useLocalStorage } from '../../Reducer/useLocalStorage';
import Pagination from './Pagination';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckIcon from '@mui/icons-material/Check';

function OrderList() {

  const navigate = useNavigate();

  const [items] = useLocalStorage('Items');
  const [user] = useLocalStorage('User');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [viewDetail, setViewDetail] = useState(false);

  function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const TestPopper = (props)=>{

    const newItems = groupArrayOfObjects(props.data,"category");
    const dates = Object.keys(newItems);
    
    const getItemsInSameCat=(date)=>{
      let tempItems = newItems[date];
      return tempItems;
    }
    
    return(
      <div>
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
                        <div>Order ID</div>
                        <div>Order Total</div>
                        <div>Order Time</div>
                        <div>
                          <Button variant='primary' disabled> <CheckIcon/> </Button>
                        </div>
                        <div>
                          <Button variant='warning' disabled> <HourglassBottomIcon/> </Button>
                        </div>
                        <div>
                          <Button variant='success' onClick={() => setViewDetail(true)}> <RemoveRedEyeIcon/> </Button>
                        </div>
                      </main>
                    </li>
                  )
                })}
              </ul>
            </article>
          )
        })} 
      </div>
    )
  }

  const handleSearchChange=(e)=>{
    setOrderSearch(e.target.value);
  }
  
  const handleDateChange=(e)=>{
    setOrderDate(e.target.value);
  }

  const filterData=(data, search, date)=>{
    if(!search && !date) return data;

    const searchTerm = search.toLowerCase();
    const dateTerm = date.toLowerCase()

    const filterData = data.filter((item)=>{
        return item.title.includes(searchTerm) && item.category.includes(dateTerm)
    })

    return filterData
}

  return (
    <div className='orderList'>
      {
        user?
        <>
          <section className='order_search_section'>
            <h1>Order List</h1>
            <div className='d-flex'>
              <input type="text" className='form-control' placeholder='Search...' value={orderSearch} onChange={handleSearchChange}/>
              <input type="date" className='form-control' value={orderDate} onChange={handleDateChange}/>
            </div>
          </section>

          <section className='order_list_container'>
            <ul className='order_header_title'>
              <li className='order_table_list bold_header'>
                <main className='order__info'>
                  <div>Order ID</div>
                  <div>Order Total</div>
                  <div>Order Time</div>
                  <div>Paid</div>
                  <div>Delivery</div>
                  <div>Action</div>
                </main>
              </li>
            </ul>
            <Pagination
                key={filterData(items, orderSearch, orderDate)}
                data={filterData(items, orderSearch, orderDate)}
                RenderComp={TestPopper}
                dataLimit={10}
            />
          </section>
        </> :
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