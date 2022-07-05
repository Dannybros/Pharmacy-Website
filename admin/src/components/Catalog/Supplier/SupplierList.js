import React from 'react'
import {Button} from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SupplierList({data, search, handleModalShow, handleDeleteEmployee}) {

  const filterEmployee=(data, searchQuery)=>{
      if(!searchQuery) return data;

      const searchTerm = searchQuery.toLowerCase()

      const filterData = data.filter((item)=>{
          const name = item.EmployeeName.toLowerCase();
          return name.includes(searchTerm)
      })
      
      return filterData
  }

  return (
      <div className="supplier_list_display">
          {data.length > 0 &&
              filterEmployee(data, search).map((item, i)=>{
                return(
                    <li className="d-flex justify-content-between" key={i}>
                        <span className="supplier_list"> {i+1}</span>
                        <span className="supplier_list" style={{textTransform:"capitalize"}}> {item.name} </span>
                        <span className="supplier_list"> {item.phone} </span>
                        <span className="supplier_list"> {item.email} </span>
                        <span className="supplier_list justify-content-around">
                            <Button variant="success" className='btn_view' onClick={()=>handleModalShow(item)}> <EditIcon className='edit_icon'/></Button> 
                            <Button variant="danger" className='btn_view' onClick={()=>handleDeleteEmployee(item._id)}> <DeleteIcon className='edit_icon'/></Button> 
                        </span>
                    </li>
                )
              })
            }
      </div>
  )
}

export default SupplierList