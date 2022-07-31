import React from 'react'
import { styled } from '@mui/material/styles';
import {Table, TableBody, TableContainer, TableHead, TableRow, Paper, Typography} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import moment from 'moment';

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

function RevenueTable({data, type}) {
  return (
    <TableContainer component={Paper} sx={{mt:2}} variant="outlined">
      <Table aria-label="customized table">
        <TableHead>
            <TableRow>
                <TableCell align="left">
                    <Typography variant='h6' component="div">
                        <b>{type}</b>
                    </Typography>
                </TableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.total}</StyledTableCell>
              <StyledTableCell align="right">{moment(row.date).format('YYYY-MM-DD')}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RevenueTable