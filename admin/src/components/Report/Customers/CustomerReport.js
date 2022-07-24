import React, {useState, useEffect} from 'react'
import './Customer.scss'
import CustomerDetail from './CustomerDetail'
import CustomerTable from './CustomerTable'
import { Paper, Typography } from '@mui/material'
import axios from '../../axios'

function CustomerReport() {
  const [addModal, setAddModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer]=useState({});
  const [search, setSearch] = useState(null);
  
  useEffect(() => {
    const fetchCustomers= async()=>{
      await axios.get('/user/get-all')
      .then(res=>{
        setCustomers(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchCustomers();
  }, [])

  const handleModalShow = async(item) => {
    await setSelectedCustomer(item);
    setAddModal(true);
  };

  const handleModalClose = () => {
    setAddModal(false);
    setSelectedCustomer({})
  };

  const handleOnSearch=(e)=>{
    setSearch(e.target.value);
  }

  return (
    <div className='customer_page'>
      <Paper sx={{py:1, px:2, mb:1}} variant="outlined">
        <Typography variant="h6" gutterBottom component="div">
          Report / Customers
        </Typography>
      </Paper>
      <Paper className="staffNav d-flex justify-content-between" variant="outlined" sx={{p:2}}>
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
      </Paper>

      <CustomerTable data={customers} search={search} handleModalShow={handleModalShow}/>

      <CustomerDetail addModal={addModal} handleModalClose={handleModalClose} selectedCustomer={selectedCustomer}/>
    </div>
  )
}

export default CustomerReport