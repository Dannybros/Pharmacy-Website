import React, {useEffect, useState} from 'react'
import './Employee.scss'
import {Button} from 'react-bootstrap'
import axios from '../../axios'
import EmployeeForm from './EmployeeForm';
import Swal from 'sweetalert2'
import EmployeeTable from './EmployeeTable';

const initialData = {EmployeeName:'', Phone:"", Joining_Date:"", Gender:"", BOD:"", Salary:""};

function Employee() {

  const [addModal, setAddModal] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);
  const [employeeData, setEmployeeData]=useState(initialData);
  const [search, setSearch] = useState(null);
  
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
      
      setAddModal(false);
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

  const handleDeleteEmployee=(id)=>{
    axios.post('/employee/delete', {id:id})
      .then(res=>{
        setEmployee(employee.filter(person=>person._id !==id));
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

  const handleOnChange =(e)=>{
    setEmployeeData({...employeeData, [e.target.name]: e.target.value});
  }

  const handleOnSearch=(e)=>{
    setSearch(e.target.value);
  }

  return (
    <div className='employee'>

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

      <EmployeeTable data={employee} search={search} handleModalShow={handleModalShow} handleDeleteEmployee={handleDeleteEmployee}/>

      <EmployeeForm addModal={addModal} handleModalClose={handleModalClose} handleButtonSubmit={handleButtonSubmit} handleOnChange={handleOnChange} employeeData={employeeData}/>
    </div>
  )
}

export default Employee