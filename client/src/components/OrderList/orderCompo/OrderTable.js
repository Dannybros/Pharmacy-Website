import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Paper, IconButton, Tooltip, Chip} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

function OrderTable({data, openDetailModal}) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
    <Paper className="mt-3">
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="center">Order ID</StyledTableCell>
                    <StyledTableCell align="center">Order Time</StyledTableCell>
                    <StyledTableCell align="center">Method</StyledTableCell>
                    <StyledTableCell align="center">Total</StyledTableCell>
                    <StyledTableCell align="center">Delivery</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length>0 &&
                     data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                     .map((row, i) => {

                        const date = moment(row.createdAt).format("MM/DD/YYYY__hh:mm");

                        return(
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                            <StyledTableCell align="center" style={{position:"relative"}}>
                                {row._id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{date}</StyledTableCell>
                            <StyledTableCell align="center">{row.paymentMethod}</StyledTableCell>
                            <StyledTableCell align="center">{row.orderTotal}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Chip label={!row.deliveryStatus?"Pending":"Delivered"} color={row.deliveryStatus?"primary":"warning"} />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Tooltip title="View" arrow>
                                <IconButton className='mx-1' aria-label="edit" style={{background:"#4caf50", color:"white"}}  onClick={() => openDetailModal(row)}>
                                    <VisibilityIcon />
                                </IconButton>
                                </Tooltip>
                            </StyledTableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
  )
}

export default OrderTable