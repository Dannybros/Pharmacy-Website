import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {ListItemText, TableContainer, Table, TableRow, TableHead, TableBody, Paper} from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ProductTable({data}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Qty</StyledTableCell>
            <StyledTableCell align="center">Brand</StyledTableCell>
            <StyledTableCell align="center">Expire Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {data!==null &&
                data.map((item)=>{
                return(
                  <TableRow key={item._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" style={{display:"flex"}}>
                          <img className="order_detail_img" src={item.img} alt=""/>
                          <ListItemText
                              primary={item?.name.en}
                              secondary={item._id}
                          />
                      </TableCell>
                      <TableCell align="center"> {item.type.en}</TableCell>
                      <TableCell align="center"> ${item.price.toLocaleString()}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.brand}</TableCell>
                      <TableCell align="center">{item.expireDate}</TableCell>
                  </TableRow>
                )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
