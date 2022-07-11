import React, {useState} from 'react'
import '../OrderList.scss'
import Moment from 'react-moment'
import {Paper} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import OrderTable from '../OrderTable';

function DeliveryList() {

    const [showDetail, setShowDetail] = useState(false);
    const [search, setSearch] = useState('');

    const handleOnSearch=(e)=>{
      setSearch(e.target.value);
    }

    const test = [{name:"d", date:"2022/06/23", check:true}, {name:"g", date:"2022/06/23", check:true}, {name:"f", date:"2022/06/24", check:true}];

  return (
    <section className='orderList'>
      <Paper className='search_order' variant='outlined'>
        <main>
          <input type="text" placeholder='Search...' className='form-control' onChange={handleOnSearch}/>
          <SearchIcon className='search_icon'/>
        </main>
        <div>
          Today: &nbsp;
          <b><Moment date={new Date()} format="YYYY/MM/DD"/></b>
        </div>
      </Paper>
      <OrderTable data={test} search={search} setShowDetail={setShowDetail}/>
    </section>
  )
}

export default DeliveryList