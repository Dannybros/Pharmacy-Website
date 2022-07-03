import React, {useEffect, useState} from 'react'
import './Employee.scss'
import {Button, Modal, Row, Col} from 'react-bootstrap'
import axios from '../../axios'
import {Snackbar, Alert, AlertTitle} from '@mui/material';
import io from 'socket.io-client';
import EmployeeList from './EmployeeList';

const initialData = {EmployeeName:'', Phone:"", Joining_Date:"", Address:"", Salary:"", Password:""};

function Employee() {
  
  //const [socket, setSocket] = useState();
  const [addModal, setAddModal] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);
  const [employeeData, setEmployeeData]=useState(initialData);
  const [search, setSearch] = useState(null);
  const [openAlert, setOpenAlert] = useState({state:false, message:"", type:'warning'});
  
  useEffect(() => {
    const fetchEmployee= async()=>{
      await axios.get('/employee')
      .then(res=>{
        setEmployee(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchEmployee();
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
    
  //   socket.on("receive_message", (data)=>{
  //     alert(data.message);
  //   })
  // }, [socket])  

  const handleModalShow = (item) => {
    setAddModal(true);
    setSelectedItem(item===null? false : true);
    setEmployeeData(item!==null? item : initialData);
  };

  const handleModalClose = () => {
    setAddModal(false);
    setSelectedItem(false);
    setEmployeeData(initialData);
  };

  const handleCloseAlert=()=>{
    setOpenAlert({state:false, message:"", type:""});
  }

  const handleOpenAlert=(message, type)=>{
    setOpenAlert({state:true, message:message, type:type});
  }

  const updateState=(newItem)=>{
    const newState = employee.map(obj => {
      if (obj._id === newItem._id) {
        return {...newItem};
      }
      return obj;
    });

    setEmployee(newState)
  }

  const handleButtonSubmit= async()=>{
    //socket.emit("send_message", {message:"test"});
    if(selectedItem){
      await axios.post('/employee/update', employeeData)
      .then(res=>{
        updateState(res.data.data)
        handleOpenAlert(res.data.message, "success");
      })
      .catch((error)=>{
        handleOpenAlert(error.response.data.message, "warning");
      })
      
    }else{
      await axios.post('/employee', employeeData)
      .then(res=>{
        setEmployee(oldArray => [...oldArray, res.data.data]);
        handleOpenAlert(res.data.message, "success");
      })
      .catch((error)=>{
        handleOpenAlert(error.response.data.message, "warning");
      })
    }

    setAddModal(false);
  }

  const handleDeleteEmployee=(id)=>{
    axios.post('/employee/delete', {id:id})
      .then(res=>{
        setEmployee(employee.filter(person=>person._id !==id));
        handleOpenAlert(res.data.message, "success");
      })
      .catch((error)=>{
        handleOpenAlert(error.response.data.message, "warning");
      })
  }

  const handleOnChange =(e)=>{
    setEmployeeData({...employeeData, [e.target.name]: e.target.value});
  }

  const handleOnSearch=(e)=>{
    setSearch(e.target.value);
  }

  return (
    <div className='employee'>
      <Snackbar open={openAlert.state} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{vertical: "top", horizontal: "right"}}>
        <Alert onClose={handleCloseAlert} variant="filled" severity={openAlert.type} sx={{ width: '100%' }} >
          <AlertTitle style={{textTransform:"capitalize"}}>{openAlert.type}</AlertTitle>
          {openAlert.message}
        </Alert>
      </Snackbar>

      <div className="staffNav p-3 d-flex justify-content-between">
          <Button className="py-1" variant='primary' onClick={()=>handleModalShow(null)}>Add New Employee</Button>
          <form className="form-inline ">
              <div className="input-group ">
                  <input className="form-control" type="search" placeholder="Search..." onChange={handleOnSearch}/>
                  <div className="input-group-prepend">
                      <span className="input-group-text">
                      <i className="fas fa-search">@</i>
                      </span>
                  </div>
              </div>
          </form>
      </div>
      <div className="staff_page">
        <ul className="staff_table">
            <li className="d-flex justify-content-between staff_table_header">
                <span className="staff_list"><b>No.</b></span>
                <span className="staff_list"><b>Name</b></span>
                <span className="staff_list"><b>Phone</b></span>
                <span className="staff_list"><b>Join Date</b></span>
                <span className="staff_list"><b>Salary</b></span>
                <span className="staff_list"><b>Action</b></span>
            </li>
            <EmployeeList data={employee} search={search} handleModalShow={handleModalShow} handleDeleteEmployee={handleDeleteEmployee}/>
        </ul>
      </div>

      <Modal 
        show={addModal} 
        onHide={handleModalClose} 
        animation={false} 
        size="lg" 
      >
        <Modal.Header>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Name:</label>
              <input type="text" className='form-control' name="EmployeeName" value={employeeData.EmployeeName} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Phone:</label>
              <input type="text" className='form-control' name="Phone" value={employeeData.Phone} onChange={handleOnChange}/>
            </Col>
            <Col sm={12} className="mb-3">
              <label className='mb-1'>Address:</label>
              <textarea type="text" className='form-control' style={{height:'65px'}} name="Address" value={employeeData.Address} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Joining Date:</label>
              <input type="date" className='form-control' name="Joining_Date" value={employeeData.Joining_Date} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Salary:</label>
              <input type="text" className='form-control' name="Salary" value={employeeData.Salary} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Password:</label>
              <input type="text" className='form-control' name="Password" value={employeeData.Password} onChange={handleOnChange}/>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}> Close </Button>
          <Button variant="primary" onClick={handleButtonSubmit}> Save </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}

export default Employee