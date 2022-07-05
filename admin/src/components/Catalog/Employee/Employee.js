import React, {useEffect, useState} from 'react'
import './Employee.scss'
import {Button, Modal, Row, Col} from 'react-bootstrap'
import axios from '../../axios'
import {Snackbar, Alert, AlertTitle} from '@mui/material';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';

const initialData = {EmployeeName:'', Phone:"", Joining_Date:"", Address:"", Salary:"", Password:""};

function Employee() {

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
    const apiURL = selectedItem? '/employee/update' : '/employee'

    await axios.post(apiURL, employeeData)
    .then(res=>{
      selectedItem? updateState(res.data.data) : setEmployee(oldArray => [...oldArray, res.data.data]);
      handleOpenAlert(res.data.message, "success");
    })
    .catch((error)=>{
      handleOpenAlert(error.response.data.message, "warning");
    })

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
        <Alert onClose={handleCloseAlert} variant="filled" severity={openAlert.type==="warning"? "warning" :"success"} sx={{ width: '100%' }} >
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

      <EmployeeForm addModal={addModal} handleModalClose={handleModalClose} handleButtonSubmit={handleButtonSubmit} handleOnChange={handleOnChange} employeeData={employeeData}/>
    </div>
  )
}

export default Employee