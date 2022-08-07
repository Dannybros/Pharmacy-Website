import React, {useState, useEffect, useRef} from 'react'
import {Modal, Form} from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import {TableContainer, Table, TableHead, TableBody, TableRow, Paper, Button, Divider} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../axios'
import Swal from 'sweetalert2'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

function CartModal({openCart, handleCloseCart, cart, setCart}) {

    const [suppliers, setSuppliers] = useState([])
    const supp = useRef();

    useEffect(() => {
      axios.get('/supplier')
      .then(res=>{
        setSuppliers(res.data)
      })
      .catch((err)=>console.log(err))
    }, [])
      
    const handleDeleteCart =(id)=>{
        setCart((items)=>{return items.filter((item)=>item._id!==id)});
        if(cart.length<=1){
            handleCloseCart();
        }
    }
  
    const handleImport=()=>{
        const supplierName = supp.current.value;
        if(supplierName==="-- select an option --"){
            alert("Please choose Supplier")
        }else{
            axios.post('/imports', {supp:supplierName, items:cart, subtotal:totalCart})
            .then(res=>{
                handleCloseCart();
                setCart([]);
                Swal.fire({
                    title: 'success',
                    text: "Order Import successful",
                    icon: 'success',
                })
            })
        }
    }

    const totalCart = cart.reduce((total, currentItem)=>{
        total += currentItem.buyingPrice * currentItem.importAmount;
        return total.toLocaleString();
    }, 0)

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
            <Form.Select ref={supp} className="form-control">
                <option selected disabled > -- Select Supplier -- </option>
                {suppliers.map((sup, i)=>(
                    <option key={i}>
                        {sup.name}
                    </option>
                ))}
            </Form.Select>
            <Divider sx={{my:2}}/>
            <TableContainer component={Paper} variant="outlined">
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
                        <TableCell align="right">{row.buyingPrice} KIP</TableCell>
                        <TableCell align="right">{row.importAmount}</TableCell>
                        <TableCell align="right">{row.buyingPrice * row.importAmount} KIP</TableCell>
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
                            <b>{totalCart} KIP</b>
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='contained' color="error" onClick={handleCloseCart}>Close</Button>
            <Button variant='contained' sx={{mx:1}} onClick={handleImport}>Import</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CartModal