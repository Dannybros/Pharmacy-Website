import React from 'react'
import {Modal} from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import {TableContainer, Table, TableHead, TableBody, TableRow, Paper, Button} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

function CartModal({openCart, handleCloseCart, cart, handleDeleteCart}) {
  return (
    <Modal
         size="lg"
         onHide={handleCloseCart}
         show={openCart}
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Import Items
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" colSpan={3}>
                       <b>Details</b> 
                    </TableCell>
                    <TableCell align="right" colSpan={1}>
                        <b>Price</b>
                    </TableCell>
                    <TableCell align="right" colSpan={1}>
                        <b>Action</b>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell><b>Desc</b></StyledTableCell>
                    <StyledTableCell align="right"><b>Price</b></StyledTableCell>
                    <StyledTableCell align="right"><b>Qty</b></StyledTableCell>
                    <StyledTableCell align="right"><b>Total</b></StyledTableCell>
                    <StyledTableCell align="right"><b></b></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cart.map((row) => (
                <TableRow key={row._id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.price} KIP</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.price * row.amount} KIP</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={()=>handleDeleteCart(row._id)}>
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
                ))}

                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell><b>Subtotal</b></TableCell>
                    <TableCell colSpan={2} align="right">
                        <b>200,000 KIP</b>
                    </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='contained' color="error" onClick={handleCloseCart}>Close</Button>
            <Button variant='contained' sx={{mx:1}}>Import</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CartModal