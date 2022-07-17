import React from 'react'
import { styled } from '@mui/material/styles';
import {Table, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Chip, Typography} from '@mui/material'
import moment from 'moment'
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

function OrderTable({data, search, handleShowDetails}) {

  const filterOrder=(data, searchQuery)=>{
    if(!searchQuery) return data;

    const searchTerm = searchQuery.toLowerCase()

    const filterData = data.filter((item)=>{
        const name = item._id.toLowerCase();
        return name.includes(searchTerm)
    })
    
    return filterData
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"><b>Order ID</b></StyledTableCell>
            <StyledTableCell align="center"><b>Order Time</b></StyledTableCell>
            <StyledTableCell align="center"><b>Payment Method</b></StyledTableCell>
            <StyledTableCell align="center"><b>Total</b></StyledTableCell>
            <StyledTableCell align="center"><b>Status</b></StyledTableCell>
            <StyledTableCell align="center"><b>Action</b></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length>0 ?
            filterOrder(data, search).map((row, i) => {
              const date = moment(row.createdAt).format("MM/DD/YYYY____hh:mm A");

              return(
                <StyledTableRow key={i}>
                  <StyledTableCell align="center" style={{position:"relative"}}>
                    {!row.checked&& <span className='alert_new_order'>new</span>}
                    {row._id}
                  </StyledTableCell>
                    <StyledTableCell align="center">{date}</StyledTableCell>
                    <StyledTableCell align="center">{row.paymentMethod}</StyledTableCell>
                    <StyledTableCell align="center">{row.orderTotal} KIP</StyledTableCell>
                    <StyledTableCell align="center">
                      <Chip label={row.status} color={row.status==="pending"? "warning" : row.status==="On Delivery"? "secondary" :"primary"} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <Tooltip title="View" arrow>
                        <IconButton className='mx-1' aria-label="edit" style={{background:"#4caf50", color:"white"}}  onClick={() => handleShowDetails(row)}>
                            <VisibilityIcon />
                        </IconButton>
                        </Tooltip>
                    </StyledTableCell>
                </StyledTableRow>
              )
            }) :
            <Typography sx={{m:3}} variant="h3" component="h2"> No Orders Yet...</Typography>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderTable