import React, {useEffect, useState, Fragment} from 'react'
import {Modal, Row, Col} from 'react-bootstrap'
import axios from '../../axios'
import { styled } from '@mui/material/styles';
import {Button, Divider, List, ListItem, ListItemText, TextField, Tooltip, Typography, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Paper, FormControl, MenuItem, Select, InputLabel} from '@mui/material'
import { useStateValue } from '../../../context/StateProvider';
import jwt_decode from 'jwt-decode'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.selected,
}));

function OrderDetail({data, showDetail, handleCloseDetails, handleSubmit, report, handleCancel}) {

    const [employee, setEmployee] = useState([]);
    const [{user}] = useStateValue();
    const [selectedEmployee, setSelectedEmployee] = useState("");

    useEffect(() => {
        const fetchEmployee= async()=>{
          await axios.get('/employee')
          .then(res=>{
            setEmployee(res.data)
          })
          .catch(err=>alert(err))
        }
    
        fetchEmployee();
    }, [])

    const handleChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

  return (
    <Modal
        show={showDetail}
        onHide={handleCloseDetails}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Order Details Info
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Typography variant="h6" component="div">
               <b>Details</b>
            </Typography>
            <List dense={true} sx={{width:300}}>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="ID"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?._id}/> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Customer" secondary="Address"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem>
                            <ListItemText 
                                primary={
                                    <Fragment> <Typography component="span" color="#757ce8"> {data?.customerName} </Typography> </Fragment>
                                } 
                                secondary="adds"
                            />
                        </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Date_Time"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.createdAt}/> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Payment Method"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.paymentMethod} /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Total Amount"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.orderTotal} /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Status"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.status.en} /> </ListItem>
                    </Col>
                </Row>
            </List>

            <Divider/>

            <Typography sx={{ mb: 1, mt:2}} variant="h6" component="div">
               <b>Order Items</b>
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data!==null &&
                         data.orderItems.map((item)=>{
                            return(
                                <TableRow key={item._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" style={{display:"flex"}}>
                                        <img className="order_detail_img" src={item.img} alt=""/>
                                        <ListItemText
                                            primary={item?.name.en}
                                            secondary={item._id}
                                        />
                                    </TableCell>
                                    <TableCell align="center"> ${item.price}</TableCell>
                                    <TableCell align="center">{item.quantity}</TableCell>
                                    <TableCell align="center">${item.quantity * item.price}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Row className='mb-4'>
                <Col xs={6} md={4} className="d-flex align-items-center"> <b className='w-100 text-center'>Employee For Order : </b></Col>
                <Col xs={6} md={8}>
                    {data?.status.en==="Pending"?
                    <FormControl sx={{width:"100%"}}>
                        <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedEmployee}
                        label="Employee Name"
                        onChange={handleChange}
                        >
                        {employee?.map((emp)=>(
                            <MenuItem value={emp.EmployeeName} key={emp._id}>{emp.EmployeeName}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>:
                    <TextField
                        sx={{width:"100%"}}
                        id="outlined-read-only-input"
                        label="Employee Name"
                        defaultValue={data?.employeeName}
                        InputProps={{
                        readOnly: true,
                        }}
                    />
                    }
                </Col>
            </Row>
            <Divider/>
        </Modal.Body>
        
        {!report&&
            <Modal.Footer>
                <Tooltip title="Only Employee Who Took Order, Can Cancel or Complete Order" placement="top-end">
                    <Button color="warning" variant='contained' onClick={handleCloseDetails}>Close</Button>
                </Tooltip>
                <Button 
                color='error' 
                variant='contained' sx={{mx:2}}
                onClick={()=>handleCancel(data)}
                disabled={data?.status.en==="On Delivery" && jwt_decode(user)?.name !==data?.employeeName}> 
                    Cancel Order 
                </Button>
                <Button 
                    variant='contained' 
                    onClick={()=>handleSubmit(data._id, data.customerID, selectedEmployee)}
                    disabled={data?.status.en==="On Delivery" && jwt_decode(user)?.name !==data?.employeeName}>
                    {data?.status.en==="Pending"? "Start Delivery" : "Complete Order"}
                </Button>
            </Modal.Footer>
        }

      </Modal>
  )
}

export default OrderDetail