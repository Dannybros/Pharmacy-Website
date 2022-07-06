import React, {useState, useEffect} from 'react'
import {Card, Button, Row, Col, Modal} from 'react-bootstrap'
import {Snackbar, Alert, AlertTitle} from '@mui/material';
import './Categories.scss'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../axios'
import Swal from 'sweetalert2'

const initialData = {Name:""}

function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryData, setCategoryData]=useState(initialData);

  useEffect(() => {
    const fetchCategory= async()=>{
      await axios.get('/category')
      .then(res=>{
        setCategory(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchCategory();
  }, [])
  
  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(false);
    setCategoryData(initialData);
  };

  const handleShow = (item) =>{
    setShowModal(true);
    setSelectedItem(item===null? false : true);
    setCategoryData(item!==null? item : initialData);
  };

  const handleOnChange =(e)=>{
    setCategoryData({...categoryData, Name: e.target.value});
  }

  const updateState=(newItem)=>{
    const newState = category.map(obj => {
      if (obj._id === newItem._id) {
        return {...newItem};
      }
      return obj;
    });

    setCategory(newState)
  }
  
  const handleBtnSubmit=async()=>{
    
    const apiURL = selectedItem? '/category/update' : '/category'
    
    await axios.post(apiURL, categoryData)
    .then(res=>{
      selectedItem?  updateState(res.data.data) : setCategory(oldArray => [...oldArray, res.data.data]);
      Swal.fire({
        title: 'success',
        text: res.data.message,
        icon: 'success',
      })
    })
    .catch((error)=>{
      Swal.fire({
        title: 'error',
        text: error.response.data.message,
        icon: 'warning',
      })
    })

    setShowModal(false);
  }

  const handleDeleteCat=(id)=>{
    axios.post('/category/delete', {id:id})
      .then(res=>{
        setCategory(category.filter(obj=>obj._id !==id));
        Swal.fire({
          title: 'success',
          text: res.data.message,
          icon: 'success',
        })
      })
      .catch((error)=>{
        Swal.fire({
          title: 'error',
          text: error.response.data.message,
          icon: 'warning',
        })
      })
  }

  return (
    <div className='category'>

      <Card body>
        <section className="card-header">
          <div className='d-flex align-items-center'>
            <FormatListBulletedIcon className='list_icon'/> &nbsp; Categories
          </div>
          <div className='d-flex align-items-center'>
            <Button className='add_icon' variant="success" name="add" onClick={()=>handleShow(null)}><AddIcon/></Button>
          </div>
        </section>
        <main className='card-main'>
          <Row className="card-table-header">
            <Col xs={7} className="card-table-cell"> Categories <KeyboardArrowDownIcon/> </Col>
            <Col xs={5} className="card-table-cell"> Action </Col>
          </Row>
          {category.length > 0 &&
            category.map((item, i)=>{
              return(
                <Row key={i}>
                  <Col xs={7} className="card-table-cell"> {item.Name} </Col>
                  <Col xs={5} className="card-table-cell"> 
                    <Button className='card_table_icon' variant='primary' name="update" onClick={()=>handleShow(item)}><CreateIcon/></Button>
                    &nbsp; &nbsp;
                    <Button className='card_table_icon' variant='danger' onClick={()=>handleDeleteCat(item._id)}><DeleteIcon/></Button>
                  </Col>
                </Row>
              )
            })
          }
        </main>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className='form-control' value={categoryData.Name} onChange={handleOnChange} placeholder='Category Name...'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBtnSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Categories