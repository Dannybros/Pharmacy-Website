import React from 'react'
import { styled } from '@mui/material/styles';
import {Table, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Chip} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }, 
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function OrderTable({data, search, setShowDetail}) {

  const filterOrder=(data, searchQuery)=>{
    if(!searchQuery) return data;

    const searchTerm = searchQuery.toLowerCase()

    const filterData = data.filter((item)=>{
        const name = item.name.toLowerCase();
        return name.includes(searchTerm)
    })
    
    return filterData
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Order ID</StyledTableCell>
            <StyledTableCell align="center">Order Time</StyledTableCell>
            <StyledTableCell align="center">Method</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
            <StyledTableCell align="center">Delivery</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length>0 &&
            filterOrder(data, search).map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell align="center" style={{position:"relative"}}>
                  {!row.check&& <span className='alert_new_order'>new</span>}
                  ID
                </StyledTableCell>
                  <StyledTableCell align="center">Order Time</StyledTableCell>
                  <StyledTableCell align="center">Method</StyledTableCell>
                  <StyledTableCell align="center">Total</StyledTableCell>
                  <StyledTableCell align="center">Delivery</StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip label="primary" color="primary" />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                      <Tooltip title="View" arrow>
                      <IconButton className='mx-1' aria-label="edit" style={{background:"#4caf50", color:"white"}}  onClick={() => setShowDetail(true)}>
                          <VisibilityIcon />
                      </IconButton>
                      </Tooltip>
                  </StyledTableCell>
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderTable