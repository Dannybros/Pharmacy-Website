import React from 'react'
import {Table, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function CustomerTable({data, search, handleModalShow}) {

  const filterEmployee=(data, searchQuery)=>{
      if(!searchQuery) return data;

      const searchTerm = searchQuery.toLowerCase()

      const filterData = data.filter((item)=>{
          const fname = item.firstName.toLowerCase();
          const lname = item.lastName.toLowerCase();
          return fname.includes(searchTerm) || lname.includes(searchTerm)
      })
      
      return filterData
  }

  return (
  <TableContainer component={Paper} className="mb-2">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center"><b>First Name</b></StyledTableCell>
          <StyledTableCell align="center"><b>NO.</b></StyledTableCell>
          <StyledTableCell align="center"><b>Second Name</b></StyledTableCell>
          <StyledTableCell align="center"><b>BirthDay</b></StyledTableCell>
          <StyledTableCell align="center"><b>Email</b></StyledTableCell>
          <StyledTableCell align="center"><b>Username</b></StyledTableCell>
          <StyledTableCell align="center"><b>Hint</b></StyledTableCell>
          <StyledTableCell align="center"><b>Action</b></StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length > 0 &&
          filterEmployee(data, search).map((row, i) => (
            <TableRow
              hover 
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center"><b>{i+1}</b></TableCell>
              <TableCell style={{textTransform:"capitalize"}} align="center">{row.firstName}</TableCell>
              <TableCell style={{textTransform:"capitalize"}} align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.birthday}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.hint}</TableCell>
              <TableCell align="center">
                <IconButton className='mx-1' aria-label="edit" style={{background:"#1976d2", color:"white"}} onClick={()=>handleModalShow(row)}>
                  <RemoveRedEyeIcon />
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

export default CustomerTable