import React, {useState, useEffect} from 'react'
import './Supplier.scss'
import {Container, Modal, Button, Row, Col} from 'react-bootstrap'
import axios from '../../axios'
import Swal from 'sweetalert2'
import SupplierTable from './SupplierTable';

const initialData = {name:'', phone:"", email:""};

function Supplier() {

  const [addModal, setAddModal] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);
  const [supplierData, setSupplierData]=useState(initialData);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    const fetchEmployee= async()=>{
      await axios.get('/supplier')
      .then(res=>{
        setSuppliers(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchEmployee();
  }, [])

  const handleModalShow = (item) => {
    setAddModal(true);
    setSelectedItem(item===null? false : true);
    setSupplierData(item!==null? item : initialData);
  };

  const handleModalClose = () => {
    setAddModal(false);
    setSelectedItem(false);
    setSupplierData(initialData);
  };

  const handleDeleteSupplier=(id)=>{
    axios.post('/supplier/delete', {id:id})
      .then(res=>{
        setSuppliers(suppliers.filter(person=>person._id !==id));
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

  const updateState=(newItem)=>{
    const newState = suppliers.map(obj => {
      if (obj._id === newItem._id) {
        return {...newItem};
      }
      return obj;
    });

    setSuppliers(newState)
  }

  const handleButtonSubmit= async()=>{
    const apiURL = selectedItem? '/supplier/update' : '/supplier'

    await axios.post(apiURL, supplierData)
    .then(res=>{
      selectedItem? updateState(res.data.data) : setSuppliers(oldArray => [...oldArray, res.data.data]);
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

    setAddModal(false);
  }

  const handleOnSearch=(e)=>{
    setSearch(e.target.value);
  }

  const handleOnChange =(e)=>{
    setSupplierData({...supplierData, [e.target.name]: e.target.value});
  }


  return (
    <Container className="supplier">

      <div className="search_box p-3 d-flex justify-content-between">
          <Button className="py-2" variant="primary" onClick={()=>handleModalShow(null)}>Add New Supplier</Button>
          <form className="form-inline">
            <div className="input-group">
                <input className="form-control ml-sm-2" type="search" placeholder="Search..." onChange={handleOnSearch}/>
                <div className="input-group-prepend">
                    <span className="input-group-text">
                    <i className="fas fa-search">@</i>
                    </span>
                </div>
            </div>
          </form>
      </div>

      <SupplierTable data={suppliers} search={search} handleModalShow={handleModalShow} handleDeleteSupplier={handleDeleteSupplier}/>
      
      <Modal 
        show={addModal} 
        onHide={handleModalClose} 
        animation={false} 
        size="lg" 
      >
        <Modal.Header>
          <Modal.Title>Supplier Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Name:</label>
              <input type="text" className='form-control' name="name" value={supplierData.name} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Email:</label>
              <input type="text" className='form-control' name="email" value={supplierData.email} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Phone:</label>
              <input type="text" 
                className='form-control' 
                name="phone" 
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={supplierData.phone} 
                onChange={handleOnChange}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}> Close </Button>
          <Button variant="primary" onClick={handleButtonSubmit}>Save </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

export default Supplier