import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function EmployeeTable({data, search, handleModalShow, handleDeleteEmployee}) {

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
  <TableContainer component={Paper} className="my-4">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center"><b>Employee Name</b></TableCell>
          <TableCell align="right"><b>Gender</b></TableCell>
          <TableCell align="right"><b>BirthDay</b></TableCell>
          <TableCell align="right"><b>Phone</b></TableCell>
          <TableCell align="right"><b>Joining_Date</b></TableCell>
          <TableCell align="right"><b>Salary</b></TableCell>
          <TableCell align="center"><b>Action</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length > 0 &&
          filterEmployee(data, search).map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align="center" scope="row" style={{textTransform:"capitalize"}}>{row.EmployeeName} </TableCell>
              <TableCell align="right">{row.Gender}</TableCell>
              <TableCell align="right">{row.BOD}</TableCell>
              <TableCell align="right">{row.Phone}</TableCell>
              <TableCell align="right">{row.Joining_Date}</TableCell>
              <TableCell align="right">{(row.Salary).toLocaleString()} KIP</TableCell>
              <TableCell align="center">
                <IconButton className='mx-1' aria-label="edit" style={{background:"#1976d2", color:"white"}} onClick={()=>handleModalShow(row)}>
                  <EditIcon />
                </IconButton>

                <IconButton className='mx-1' aria-label="delete" style={{background:"#d32f2f", color:"white"}} onClick={()=>handleDeleteEmployee(row._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default EmployeeTable